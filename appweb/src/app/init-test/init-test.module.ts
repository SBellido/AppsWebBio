import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitTestRoutingModule } from './init-test-routing.module';

import { InitTestComponent } from './components/init-test.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    InitTestComponent
  ],
  imports: [
    CommonModule,
    InitTestRoutingModule,
    SharedModule
  ]
})
export class InitTestModule { }
