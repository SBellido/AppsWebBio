import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TestCreativityRoutingModule } from './testCreativity-routing.module';
import { MaterialModule } from './../material/material.module';

import { TestCreativityComponent } from './components/testCreativity.component';
import { ElementComponent } from './components/element/element.component';
import { UserComponent } from './components/user/components/user.components';
import { ClockComponent } from './components/clock/clock.component';


@NgModule({
    declarations: [
        ElementComponent,
        TestCreativityComponent,
        UserComponent,
        ClockComponent
    ],
    imports: [
        CommonModule,
        TestCreativityRoutingModule,
        FormsModule,
        MaterialModule
    ]
})

export class TestCreativityModule {}
