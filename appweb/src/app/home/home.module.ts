import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home.component';
import { MaterialModule } from './../material/material.module';

import { HomeRoutingModule } from './home-routing.module';


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        MaterialModule
    ]
})

export class HomeModule {}
