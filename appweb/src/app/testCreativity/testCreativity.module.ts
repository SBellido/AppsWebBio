import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TestCreativityRoutingModule } from './testCreativity-routing.module';
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { TestCreativityComponent } from './components/testCreativity.component';
import { ClockComponent } from './components/clock/clock.component';
import { ElementComponent } from './components/element/element.component';
import { ProposalComponent } from './components/proposal/proposal.component';
import { CreativeUserComponent } from './components/creative-user/creative-user.component';

@NgModule({
    declarations: [
        TestCreativityComponent,
        ClockComponent,
        ElementComponent,
        ProposalComponent,
        CreativeUserComponent
    ],
    imports: [
        CommonModule,
        TestCreativityRoutingModule,
        FormsModule,
        MaterialModule,
        SharedModule
    ],
    exports: [
        TestCreativityComponent,
        ClockComponent,
        ElementComponent,
        ProposalComponent,
        CreativeUserComponent
    ]
})

export class TestCreativityModule {}


