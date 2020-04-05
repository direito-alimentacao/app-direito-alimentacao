import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, IonContent, ModalController, ToastController } from '@ionic/angular';
import { RepositoryService } from '../services/repository.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private API_BASE_URL: string = 'https://direito-alimentacao.herokuapp.com/api';

  constructor(private formBuilder: FormBuilder,
    private alertController: AlertController,
    private http: HttpClient,
    private repo: RepositoryService,
    private toastController: ToastController,
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
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post<any>(`${this.API_BASE_URL}/auth/login`,
        JSON.stringify(this.form.value), httpOptions).subscribe(data => {
          let user: User = new User();
          user.token = data.access_token;
          user.userId = data.user_id;
          this.repo.saveUser(user).then(() => {
            this.modalController.dismiss(
              {
                'dismissed': true
              }
            );
          })
        }, error => {
          this.presentToast("Erro na autenticação: login/senha inválido!")
        });
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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
                'dismissed': false
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }
}
