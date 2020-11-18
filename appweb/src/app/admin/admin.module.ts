import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileSaverModule } from 'ngx-filesaver';

import { DataDbService } from '../core/services/db/data-db.service';

@NgModule({
  providers: [
    DataDbService
  ],
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    FileSaverModule
  ]
})

export class AdminModule { }
