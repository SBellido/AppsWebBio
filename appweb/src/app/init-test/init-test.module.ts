import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { InitTestRoutingModule } from './init-test-routing.module';
import { MaterialModule } from './../material/material.module';

import { InitTestComponent } from './components/init-test.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [
    InitTestComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    InitTestRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class InitTestModule { }
