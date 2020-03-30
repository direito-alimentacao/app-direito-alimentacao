import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInterviewPage } from './add-interview.page';

const routes: Routes = [
  {
    path: '',
    component: AddInterviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInterviewPageRoutingModule {}
