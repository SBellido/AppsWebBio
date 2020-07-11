import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { InitTestRoutingModule } from './init-test-routing.module';
import { MaterialModule } from './../material/material.module';

import { InitTestComponent } from './components/init-test.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { DataDbService } from './../core/services/db/data-db.service';

@NgModule({
  declarations: [
    InitTestComponent,
    UserFormComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    InitTestRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [DataDbService]
})

export class InitTestModule { }
