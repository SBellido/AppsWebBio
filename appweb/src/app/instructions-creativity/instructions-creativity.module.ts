import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InstructionsCreativityComponent } from './components/instructionsCreativity.component';
import { HeaderComponent } from '../header/header.component'

import { InstructionsCreativityRoutingModule } from './instructions-creativity-routing';

@NgModule({
    declarations: [
        InstructionsCreativityComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        InstructionsCreativityRoutingModule,
        FormsModule
    ]
})

export class InstructionsCreativityModule {}
