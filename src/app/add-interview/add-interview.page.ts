import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { storage_constants } from '../constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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

  isFormValid() {
    return this.form ? this.form.valid : false;
  }

  constructor(private storage: Storage, private formBuilder: FormBuilder,
    private alertController: AlertController, private router: Router) {
    
  }

  private createForm(agentName: string) {
    this.form = this.formBuilder.group({
      agentName: [agentName, [Validators.required]],
      familyLeader: ['', [Validators.required]],
      familyAddress: ['', [Validators.required]],
      familyPhoneNumber: [''],
      familyNIS: [''],
      familyIncome: ['', [Validators.required]],
      familyMembers: ['0'],
      riskGroup: ['false'],
      children0To2: ['false'],
      children2To5: ['false'],
      pregnant: ['false'],
      disabledPeople: ['false'],
      oldPeople: ['false']
    });
  }

  ngOnInit() {
    this.storage.get(storage_constants.AGENT_NAME_STORAGE_KEY).then((val) => {
      const agentName: string = val as string;
      this.createForm(agentName);
    });
  }

  public save() {
    if (this.form.valid) {
      const interview: Interview = Object.assign({}, this.form.value);
      console.log(interview);
      this.storage.set(storage_constants.AGENT_NAME_STORAGE_KEY, interview.agentName);
      this.router.navigate(['/home']);
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
