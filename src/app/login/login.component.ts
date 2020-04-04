import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, IonContent, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Interview } from '../model/interview';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController) {
  }

  async ngOnInit() {
    this.createForm();
  }

  isFormValid() {
    return this.form ? this.form.valid : false;
  }

  private createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.form.valid) {
      this.modalController.dismiss(
        {
          'token': '123456'
        }
      );
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Você deseja sair <strong>sem enviar</strong> os dados da entrevista?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        }, {
          text: 'Sim',
          handler: () => {
            this.modalController.dismiss(
              {
                'token': null
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }
}
