import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitTestComponent } from './components/init-test.component';

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
