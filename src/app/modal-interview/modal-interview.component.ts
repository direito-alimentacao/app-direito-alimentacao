import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { Interview } from '../model/interview';

@Component({
  selector: 'app-modal-interview',
  templateUrl: './modal-interview.component.html',
  styleUrls: ['./modal-interview.component.scss'],
})
export class ModalInterviewComponent implements OnInit {

  @Input() interview: Interview;
  @ViewChild('iContent', { static: false }) cont: IonContent;

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  segmentChanged(ev: any) {
    let y = document.getElementById(ev.detail.value).offsetTop;
    this.cont.scrollToPoint(0, y, 500);
  }


  close() {
    this.modalController.dismiss();
  }

}
