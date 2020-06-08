import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Interview } from '../model/interview';
import { ModalInterviewComponent } from '../modal-interview/modal-interview.component';
import { RepositoryService } from '../services/repository.service';
import { ModalSaveComponent } from '../modal-save/modal-save.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { User } from '../model/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  interviews: Interview[] = [];
  user: User;

  private API_BASE_URL: string = 'https://direitoalimentacao.herokuapp.com/api';

  constructor(private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private repo: RepositoryService,
    private http: HttpClient,
    private loadingController: LoadingController) {
  }

  async ionViewDidEnter() {
    this.updateInterviewsList();
    this.updateUserData();
  }

  async ngOnInit() {
    await this.updateInterviewsList();
    for (let interview of this.interviews) {
      if (!interview.wasSent) {
        this.presentAlertUnsentInterviews();
        break;
      }
    }
  }

  private async updateInterviewsList() {
    this.interviews = await this.repo.getInterviews();
  }

  private async updateUserData() {
    this.user = await this.repo.getUser();
  }

  async logout() {
    await this.repo.deleteUser();
    this.user = null;
  }

  async presentActionSheet(interview: Interview) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações',
      buttons: [
        {
          text: 'Visualizar',
          icon: 'eye-outline',
          handler: () => {
            this.presentModal(interview);
          }
        },
        {
          text: 'Editar',
          icon: 'create-outline',
          handler: () => {
            if (!interview.wasSent) {
              this.presentSaveModal(interview);
            } else {
              this.presentToast("Não é possível editar entrevistas já enviadas!");
            }
          }
        },
        {
          text: 'Enviar',
          icon: 'navigate-outline',
          handler: () => {
            if (!interview.wasSent) {
              if (!this.user || !this.user.token) {
                this.presentLoginModal(interview);
              } else {
                this.presentLoading(interview);
              }
            } else {
              this.presentToast("Entrevista já enviada!")
            }
          }
        },
        {
          text: 'Desbloquear',
          icon: 'lock-open-outline',
          handler: () => {
            if (interview.wasSent) {
              this.presentAlertConfirmUnlock(interview);
            } else {
              this.presentToast("Entrevista não enviada ainda!")
            }
          }
        },
        {
          text: 'Remover',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentAlertConfirm(interview);
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }

  async presentLoading(interview: Interview) {
    const loading = await this.loadingController.create({
      message: 'Enviando...'
    });
    await loading.present();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${this.user.token}`
      })
    };

    interview.idAgent = this.user.userId;

    // To upper case
    interview.agentName = interview.agentName.toUpperCase();
    interview.familyLeader = interview.familyLeader.toUpperCase();
    interview.familyAddress = interview.familyAddress.toUpperCase();

    this.http.post<any>(`${this.API_BASE_URL}/dados_pessoais/store`,
      JSON.stringify(interview), httpOptions).subscribe(data => {
        // do nothing
      }, error => {
        if (error.status == 200) {
          interview.wasSent = true;
          this.repo.saveInterviews(this.interviews).then(() => {
            loading.dismiss();
            this.presentToast("Entrevista enviada com sucesso!");
          }).catch((error) => {
            loading.dismiss();
            this.presentToast("Ops, algo deu errado! Tente novamente mais tarde.");
          });
        } else if (error.status == 401) {
          this.presentLoginModal(interview);
        } else {
          loading.dismiss();
          this.presentToast("Ops, algo deu errado! Tente novamente mais tarde.");
        }
      });
  }

  async presentAlertConfirmLogout() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Você deseja fazer <strong>logout</strong> no sistema?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        }, {
          text: 'Sim',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm(interview: Interview) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Você deseja <strong>remover</strong> esta entrevista?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        }, {
          text: 'Sim',
          handler: () => {
            this.interviews = this.interviews.filter(item => item.interviewDate.getTime() != interview.interviewDate.getTime());
            this.repo.saveInterviews(this.interviews).then(() => {
              this.presentToast("Entrevista removida com sucesso!");
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmUnlock(interview: Interview) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Ao <strong>desbloquear</strong> a entrevista, ela será considerada uma nova entrevista a ser enviada ao CRAS. Confirmar?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        }, {
          text: 'Sim',
          handler: () => {
            interview.wasSent = false;
            interview.interviewDate = new Date();
            this.repo.saveInterviews(this.interviews).then(() => {
              this.presentToast("Entrevista desbloqueada com sucesso!");
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertUnsentInterviews() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Há entrevistas <strong>não enviadas</strong> ao CRAS.',
      buttons: [{
        text: 'Ok'
      }
      ]
    });

    await alert.present();
  }


  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentModal(interview: Interview) {
    const modal = await this.modalController.create({
      component: ModalInterviewComponent,
      backdropDismiss: false,
      componentProps: {
        'interview': interview
      }
    });
    return await modal.present();
  }



  async presentSaveModal(interview?: Interview) {
    const value = interview ? interview : new Interview();
    const modal = await this.modalController.create({
      component: ModalSaveComponent,
      backdropDismiss: false,
      componentProps: {
        'interview': value
      }
    });

    modal.onWillDismiss().then((value: any) => {
      if (value.data.dismissed) {
        this.updateInterviewsList();
        this.presentToast("Entrevista salva com sucesso!");
      }
    });


    return await modal.present();
  }

  async presentLoginModal(interview: Interview) {
    const modal = await this.modalController.create({
      component: LoginComponent,
      backdropDismiss: false
    });

    modal.onWillDismiss().then(async (value: any) => {
      if (value.data.dismissed) {
        await this.updateUserData();
        this.presentLoading(interview);
      }
    });

    return await modal.present();
  }

}
