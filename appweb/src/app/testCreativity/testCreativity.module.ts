import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TestCreativityComponent } from './components/testCreativity.component';
import { ElementComponent } from './components/element/element.component';
import { UserComponent } from './components/user/components/user.components';
import { ClockComponent } from './components/clock/clock.component';

import { TestCreativityRoutingModule } from './testCreativity-routing.module';

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
        FormsModule
    ]
})

export class TestCreativityModule {}
