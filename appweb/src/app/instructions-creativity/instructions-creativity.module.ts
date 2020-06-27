import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InstructionsCreativityComponent } from './components/instructionsCreativity.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../header/header.component';

import { InstructionsCreativityRoutingModule } from './instructions-creativity-routing';

@NgModule({
    declarations: [
        InstructionsCreativityComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        InstructionsCreativityRoutingModule,
        FormsModule,
        SharedModule
    ]
})

export class InstructionsCreativityModule {}
