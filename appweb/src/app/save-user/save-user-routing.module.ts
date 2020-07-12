import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveUserComponent } from './components/save-user.component';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: SaveUserComponent
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
export class SaveUserRoutingModule { }
