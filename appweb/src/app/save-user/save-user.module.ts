import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SaveUserRoutingModule } from './save-user-routing.module';
import { MaterialModule } from '../material/material.module';

import { SaveUserComponent } from './components/save-user.component';
import { ContactComponent } from './components/contact/contact.component';
import { DataDbService } from '../core/services/db/data-db.service';

@NgModule({
  declarations: [
    SaveUserComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    SaveUserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [DataDbService]
})

export class SaveUserModule { }
