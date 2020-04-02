import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { storage_constants } from '../constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { Interview } from '../model/interview';

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
        this.interviews.push(new Interview(element));
      });
      this.createForm(new Interview());
    });
  }

  segmentChanged(ev: any) {
    let y = document.getElementById(ev.detail.value).offsetTop;
    this.cont.scrollToPoint(0, y, 500);
  }

  isFormValid() {
    return this.form ? this.form.valid : false;
  }

  formatCurrency($event) {
    var aux = $event.target.value;
    aux = aux.replace(/\./g, "");
    aux = aux.replace(/\s/g, "");
    aux = aux.replace(/\R/g, "");
    aux = aux.replace(/\$/g, "");
    aux = aux.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    if (aux.length > 1) aux = aux.replace(/^0+/, ''); /* Replace leading zeros */
    $event.target.value = "R$ " + aux;
  }

  private createForm(interview: Interview) {
    this.form = this.formBuilder.group({
      familyLeader: [interview.familyLeader, [Validators.required]],
      familyLeaderDocument: [interview.familyLeaderDocument, [Validators.required]],
      familyAddress: [interview.familyAddress, [Validators.required]],
      familyPhoneNumber: [interview.familyPhoneNumber],
      familyCelphoneNumber: [interview.familyCelphoneNumber],
      familyNIS: [interview.familyNIS],
      familyIncome: [interview.familyIncome, [Validators.required]],
      familyMembers: [interview.familyMembers, [Validators.required]],
      members0To2: [interview.members0To2, [Validators.required]],
      members2To5: [interview.members2To5, [Validators.required]],
      members5To18: [interview.members5To18, [Validators.required]],
      pregnant: [interview.pregnant, [Validators.required]],
      disabledPeople: [interview.disabledPeople, [Validators.required]],
      oldPeople: [interview.oldPeople, [Validators.required]],
      assistanceBPC: [interview.assistanceBPC],
      assistanceBF: [interview.assistanceBF],
      assistanceDeath: [interview.assistanceDeath],
      assistanceFood: [interview.assistanceFood],
      assistanceOthers: [interview.assistanceOthers],
      fsg1q1: [interview.fsg1q1],
      fsg1q2: [interview.fsg1q2],
      fsg1q3: [interview.fsg1q3],
      fsg1q4: [interview.fsg1q4],
      fsg2q1: [interview.fsg2q1],
      fsg2q2: [interview.fsg2q2],
      fsg2q3: [interview.fsg2q3],
      fsg2q4: [interview.fsg2q4],
      fsg3q1: [interview.fsg3q1],
      fsg3q2: [interview.fsg3q2],
      fsg3q3: [interview.fsg3q3],
      fsg3q4: [interview.fsg3q4],
      fsg3q5: [interview.fsg3q5],
      fsg3q6: [interview.fsg3q5],
    });
  }

  showFeedSafetyGroup2(): boolean {
    return (this.form.value.fsg1q1 ||
      this.form.value.fsg1q2 ||
      this.form.value.fsg1q3 ||
      this.form.value.fsg1q4);
  }

  showFeedSafetyGroup3(): boolean {
    return (this.showFeedSafetyGroup2() &&
      (this.form.value.members0To2 > 0 ||
        this.form.value.members2To5 > 0 ||
        this.form.value.members5To18 > 0));
  }

  save() {
    if (this.form.valid) {
      this.interviews.push(new Interview(this.form.value));
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
