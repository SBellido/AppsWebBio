import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { HeaderDarkComponent } from './components/header-dark/header-dark.component';
import { HeaderDarkIsologoComponent } from './components/header-dark-isologo/header-dark-isologo.component';

import { HeaderQuestionComponent } from './components/header-question/header-question.component';
import { HeaderCreativityComponent } from './components/header-creativity/header-creativity.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';

import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './../material/material.module';
import { ReplaceNullWithTextPipe } from './pipes/replace-null-with-text.pipe';
import { HeaderRulitComponent } from './components/header-rulit/header-rulit.component';
import { HeaderQuestionRulitComponent } from './components/header-questionRulit/header-questionRulit.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderDarkComponent,
    HeaderDarkIsologoComponent,
    HeaderQuestionComponent,
    HeaderCreativityComponent,
    HeaderAdminComponent,
    FooterComponent,
    ReplaceNullWithTextPipe,
    HeaderRulitComponent,
    HeaderQuestionRulitComponent
  ],
  exports: [
    HeaderComponent,
    HeaderDarkComponent,
    HeaderDarkIsologoComponent,
    HeaderQuestionComponent,
    HeaderCreativityComponent,
    HeaderAdminComponent,
    FooterComponent,
    ReplaceNullWithTextPipe,
    HeaderRulitComponent,
    HeaderQuestionRulitComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
