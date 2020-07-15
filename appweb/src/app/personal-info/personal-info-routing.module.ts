import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalInfoComponent } from './components/personal-info.component';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalInfoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    MyDialogComponent
  ]
})
export class PersonalInfoRoutingModule { }
