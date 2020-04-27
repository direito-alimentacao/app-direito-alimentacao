import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, IonContent, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Interview } from '../model/interview';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-modal-save',
  templateUrl: './modal-save.component.html',
  styleUrls: ['./modal-save.component.scss']
})
export class ModalSaveComponent implements OnInit {

  form: FormGroup;
  interviews: Interview[];
  numberOptions: number[];

  @Input() interview: Interview;
  @ViewChild('iContent', { static: false }) cont: IonContent;


  constructor(private repo: RepositoryService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController) {
    this.numberOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  async ngOnInit() {
    this.createForm();
  }

  async ionViewDidEnter() {
    this.interviews = await this.repo.getInterviews();
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
    aux = aux.replace(/\,/g, "");
    aux = aux.replace(/\s/g, "");
    if (aux.length > 1) aux = aux.replace(/^0+/, '1,'); /* Replace leading zeros */
    $event.target.value = aux;
  }

  private createForm() {
    this.form = this.formBuilder.group({
      agentName: [this.interview.agentName, [Validators.required]],
      familyLeader: [this.interview.familyLeader, [Validators.required]],
      familyLeaderDocument: [this.interview.familyLeaderDocument, [Validators.required]],
      familyAddress: [this.interview.familyAddress, [Validators.required]],
      familyPhoneNumber: [this.interview.familyPhoneNumber],
      familyCelphoneNumber: [this.interview.familyCelphoneNumber],
      familyNIS: [this.interview.familyNIS],
      familyIncome: [this.interview.familyIncome, [Validators.required]],
      familyMembers: [this.interview.familyMembers, [Validators.required]],
      members0To2: [this.interview.members0To2],
      members2To5: [this.interview.members2To5],
      members5To18: [this.interview.members5To18],
      pregnant: [this.interview.pregnant],
      disabledPeople: [this.interview.disabledPeople],
      oldPeople: [this.interview.oldPeople],
      assistanceBPC: [this.interview.assistanceBPC],
      assistanceBF: [this.interview.assistanceBF],
      assistanceDeath: [this.interview.assistanceDeath],
      assistanceFood: [this.interview.assistanceFood],
      assistanceOthers: [this.interview.assistanceOthers],
      fsg1q1: [this.interview.fsg1q1],
      fsg1q2: [this.interview.fsg1q2],
      fsg1q3: [this.interview.fsg1q3],
      fsg1q4: [this.interview.fsg1q4],
      fsg2q1: [this.interview.fsg2q1],
      fsg2q2: [this.interview.fsg2q2],
      fsg2q3: [this.interview.fsg2q3],
      fsg2q4: [this.interview.fsg2q4],
      fsg3q1: [this.interview.fsg3q1],
      fsg3q2: [this.interview.fsg3q2],
      fsg3q3: [this.interview.fsg3q3],
      fsg3q4: [this.interview.fsg3q4],
      fsg3q5: [this.interview.fsg3q5],
      fsg3q6: [this.interview.fsg3q5],
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
      const value = new Interview(this.form.value);
      if (!this.interview.interviewDate) {
        this.repo.addInterview(value).then(() => {
          this.modalController.dismiss(
            {
              'dismissed': true
            }
          );
        });
      } else {
        value.interviewDate = this.interview.interviewDate;
        this.interviews = this.interviews.map(item => item.interviewDate.getTime() == value.interviewDate.getTime() ? value : item);
        this.repo.saveInterviews(this.interviews).then(() => {
          this.modalController.dismiss(
            {
              'dismissed': true
            }
          );
        });
      }
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
