import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCreativityComponent } from './components/admin-creativity/admin-creativity.component';
import { AdminEncodeComponent } from './components/admin-encode/admin-encode.component';
import { AdminRulitComponent } from './components/admin-rulit/admin-rulit.component';

import { AdminComponent } from './components/admin.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'creativity',
    component: AdminCreativityComponent
  },
  {
    path: 'rulit',
    component: AdminRulitComponent
  },
  {
    path: 'encode',
    component: AdminEncodeComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
