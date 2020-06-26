import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ElementComponent } from './components/element/element.component';
import { TestCreativityComponent } from './components/testCreativity.component';
import { UserComponent } from './components/user/user.components';

import { TestCreativityRoutingModule } from './testCreativity-routing.module';

@NgModule({
    declarations: [
        ElementComponent,
        TestCreativityComponent,
        UserComponent,
    ],
    imports: [
        CommonModule,
        TestCreativityRoutingModule,
        FormsModule
    ]
})

export class TestCreativityModule {}
