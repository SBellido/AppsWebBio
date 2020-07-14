import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { HeaderDarkComponent } from './components/header-dark/header-dark.component';
import { HeaderQuestionComponent } from './components/header-question/header-question.component';
import { HeaderCreativityComponent } from './components/header-creativity/header-creativitycomponent';

import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderDarkComponent,
    HeaderQuestionComponent,
    HeaderCreativityComponent

  ],
  exports: [
    HeaderComponent,
    HeaderDarkComponent,
    HeaderQuestionComponent,
    HeaderCreativityComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
