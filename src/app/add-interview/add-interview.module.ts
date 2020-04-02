import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInterviewPageRoutingModule } from './add-interview-routing.module';

import { AddInterviewPage } from './add-interview.page';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxMaskIonicModule,
    AddInterviewPageRoutingModule
  ],
  declarations: [AddInterviewPage]
})
export class AddInterviewPageModule {}
