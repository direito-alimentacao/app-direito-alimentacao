import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { storage_constants } from '../constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { Interview } from '../model/interview';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-add-interview',
  templateUrl: './add-interview.page.html',
  styleUrls: ['./add-interview.page.scss'],
})
export class AddInterviewPage implements OnInit {

  agentName: string;
  form: FormGroup;
  interviews: Interview[];
  numberOptions: number[];

  @ViewChild('iContent', { static: false }) cont: IonContent;

  constructor(private storage: Storage, private formBuilder: FormBuilder,
    private alertController: AlertController, private router: Router) {
      this.numberOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];      
  }

  async ngOnInit() {
    this.interviews = [];
    this.storage.get(storage_constants.INTERVIEWS_STORAGE_KEY).then((val) => {
      const items: any[] = val ? val : [];
      items.forEach(element => {
        this.interviews.push(new Interview(element, false));
      });
      this.createForm();
    });
  }

  segmentChanged(ev: any) {
    let y = document.getElementById(ev.detail.value).offsetTop;
    this.cont.scrollToPoint(0, y, 500);
  }

  isFormValid() {
    return this.form ? this.form.valid : false;
  }

  private createForm() {
    this.form = this.formBuilder.group({
      agentName: ['', [Validators.required]],
      familyLeader: ['', [Validators.required]],
      familyDocument: ['', [Validators.required]],
      familyAddress: ['', [Validators.required]],
      familyPhoneNumber: [''],
      familyNIS: [''],
      familyIncome: ['', [Validators.required]],
      familyMembers: ['', [Validators.required]],
      children0To2: ['', [Validators.required]],
      children2To5: ['', [Validators.required]],
      pregnant: ['', [Validators.required]],
      disabledPeople: ['', [Validators.required]],
      oldPeople: ['', [Validators.required]],
      assistanceBPC: [false],
      assistanceBF: [false],
      assistanceDeath: [false],
      assistanceFood: [false],
      assistanceOthers: ['']
    });
  }


  save() {
    if (this.form.valid) {
      this.interviews.push(new Interview(this.form.value, true));
      this.storage.set(storage_constants.INTERVIEWS_STORAGE_KEY, this.interviews).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Você deseja sair <strong>sem salvar</strong> os dados da entrevista?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        }, {
          text: 'Sim',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
}
