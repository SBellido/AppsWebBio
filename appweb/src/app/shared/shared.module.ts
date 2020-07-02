import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { HeaderDarkComponent } from './components/header-dark/header-dark.component';
import { HeaderLightComponent } from './components/header-light/header-light.component';

import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderDarkComponent,
    HeaderLightComponent
  ],
  exports: [
    HeaderComponent,
    HeaderDarkComponent,
    HeaderLightComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }
