import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TestCreativityRoutingModule } from './testCreativity-routing.module';
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';

import { TestCreativityComponent } from './components/testCreativity.component';
import { UserComponent } from './components/user/components/user.components';
import { ClockComponent } from './components/clock/clock.component';
import { ElementComponent } from './components/element/element.component';

@NgModule({
    declarations: [
        TestCreativityComponent,
        UserComponent,
        ClockComponent,
        ElementComponent
    ],
    imports: [
        CommonModule,
        TestCreativityRoutingModule,
        FormsModule,
        MaterialModule,
        SharedModule
    ]
})

export class TestCreativityModule {}
