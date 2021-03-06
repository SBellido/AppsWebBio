import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminCreativityComponent } from './components/admin-creativity/admin-creativity.component';
import { AdminEncodeComponent } from './components/admin-encode/admin-encode.component';
import { AdminRulitComponent } from './components/admin-rulit/admin-rulit.component';

import { AdminComponent } from './components/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'creativity',
    component: AdminCreativityComponent,
    canActivate: [ AdminAuthGuard ]
  },
  {
    path: 'rulit',
    component: AdminRulitComponent,
    canActivate: [ AdminAuthGuard ]
  },
  {
    path: 'encode',
    component: AdminEncodeComponent,
    canActivate: [ AdminAuthGuard ]
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
