import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InstructionsCreativityComponent } from './components/instructionsCreativity.component';
import { SharedModule } from '../shared/shared.module';

import { InstructionsCreativityRoutingModule } from './instructions-creativity-routing';
import { MaterialModule } from './../material/material.module';

@NgModule({
    declarations: [
        InstructionsCreativityComponent,
    ],
    imports: [
        CommonModule,
        InstructionsCreativityRoutingModule,
        FormsModule,
        SharedModule,
        MaterialModule,
        RouterModule
    ]
})

export class InstructionsCreativityModule {}
