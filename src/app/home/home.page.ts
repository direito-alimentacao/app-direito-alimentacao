import { Component } from '@angular/core';
import { ActionSheetController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Interview, STATUS } from '../model/interview';
import { ModalInterviewComponent } from '../modal-interview/modal-interview.component';
import { RepositoryService } from '../services/repository.service';
import { ModalSaveComponent } from '../modal-save/modal-save.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  interviews: Interview[];

  constructor(private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private repo: RepositoryService) {

  }

  ionViewDidEnter() {
    this.updateInterviewsList();
  }

  private async updateInterviewsList() {
    this.interviews = await this.repo.getInterviews();
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
            console.log(interview.status);
            if (interview.status === STATUS.TO_SEND) {
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
            interview.status = STATUS.SENT;
            this.repo.saveInterviews(this.interviews).then(() => {
              this.presentToast("Entrevista enviada com sucesso!");
            });
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

  async presentAlertConfirm(interview: Interview) {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Você deseja sair <strong>remover</strong> esta entrevista?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        }, {
          text: 'Sim',
          handler: () => {
            this.interviews = this.interviews.filter(item => item.createdAt.getTime() != interview.createdAt.getTime());
            this.repo.saveInterviews(this.interviews).then(() => {
              this.presentToast("Entrevista removida com sucesso!");
            });
          }
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

}
