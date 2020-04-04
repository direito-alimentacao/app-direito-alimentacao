import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ModalInterviewComponent } from '../modal-interview/modal-interview.component';
import { YesNoPipe } from '../yes-no.pipe';
import localePtBr from '@angular/common/locales/pt';

import { registerLocaleData } from '@angular/common';
import { ModalSaveComponent } from '../modal-save/modal-save.component';

import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { LoginComponent } from '../login/login.component';
registerLocaleData(localePtBr);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskIonicModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ModalInterviewComponent, LoginComponent, ModalSaveComponent, YesNoPipe],
  entryComponents: [ModalInterviewComponent, LoginComponent, ModalSaveComponent]

})
export class HomePageModule { }
