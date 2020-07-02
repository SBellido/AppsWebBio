import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitTestComponent } from './components/init-test.component';
// import { UserFormComponent } from './../init-test/components/user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: InitTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitTestRoutingModule { }
