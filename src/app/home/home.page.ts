import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private actionSheetController: ActionSheetController) {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ações',
      buttons: [
        {
          text: 'Visualizar',
          icon: 'eye-outline',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Enviar',
          icon: 'navigate-outline',
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Remover',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }
}
