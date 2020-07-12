import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PruebaTiempoRoutingModule } from './prueba-tiempo-routing.module';
import { MaterialModule } from './../material/material.module';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { SharedModule } from './../shared/shared.module';

import { TimeComponent } from './components/time/time.component';
import { PruebaComponent } from './components/prueba-tiempo.component';


@NgModule({
  declarations: [
    TimeComponent,
    PruebaComponent,
  ],
  imports: [
    CommonModule,
    PruebaTiempoRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule,

    // BrowserModule,
    // ReactiveFormsModule,
    // HttpClientModule,
    // HttpClientJsonpModule
  ]
})
export class PruebaTiempoModule { }
