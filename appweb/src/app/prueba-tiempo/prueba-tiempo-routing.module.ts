import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebaComponent } from './components/prueba-tiempo.component';


const routes: Routes = [
  {
    path: '',
    component: PruebaComponent
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

export class PruebaTiempoRoutingModule { }
