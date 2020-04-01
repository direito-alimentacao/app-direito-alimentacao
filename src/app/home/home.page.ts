import { Component } from '@angular/core';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Interview, STATUS } from '../model/interview';
import { Storage } from '@ionic/storage';
import { storage_constants } from '../constants';
import { ModalInterviewComponent } from '../modal-interview/modal-interview.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  interviews: Interview[];

  constructor(private storage: Storage,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private alertController: AlertController) {
  }

  ionViewDidEnter() {
    this.updateInterviewsList();
  }

  private updateInterviewsList() {
    this.interviews = [];
    this.storage.get(storage_constants.INTERVIEWS_STORAGE_KEY).then((val) => {
      const items: any[] = val ? val : [];
      items.forEach(element => {
        this.interviews.push(new Interview(element, false));
      });
    });
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
          text: 'Enviar',
          icon: 'navigate-outline',
          handler: () => {
            interview.status = STATUS.SENT;
            this.storage.set(storage_constants.INTERVIEWS_STORAGE_KEY, this.interviews).then(() => {
              this.updateInterviewsList();
            })
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
            this.interviews = this.interviews.filter(item => item.createdAt != interview.createdAt);
            this.storage.set(storage_constants.INTERVIEWS_STORAGE_KEY, this.interviews).then(() => {
              // pesquisa removida com sucesso!
            });
          }
        }
      ]
    });

    await alert.present();
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
}
