import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './components/page-not-found.component';

import { PageNotFoundRoutingModule } from './page-not-found-routing';
import { MaterialModule } from './../material/material.module';

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        PageNotFoundRoutingModule,
        FormsModule,
        MaterialModule
    ]
})

export class PageNotFoundModule {}
