import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InstructionsCreativityComponent } from './components/instructionsCreativity.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../header/header.component';

import { InstructionsCreativityRoutingModule } from './instructions-creativity-routing';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        InstructionsCreativityComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        InstructionsCreativityRoutingModule,
        FormsModule,
        SharedModule,
        MatButtonModule
    ]
})

export class InstructionsCreativityModule {}
