import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Interview } from '../model/interview';

@Component({
  selector: 'app-modal-interview',
  templateUrl: './modal-interview.component.html',
  styleUrls: ['./modal-interview.component.scss'],
})
export class ModalInterviewComponent implements OnInit {

  @Input() interview: Interview;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  close() {
    this.modalController.dismiss();
  }

}
