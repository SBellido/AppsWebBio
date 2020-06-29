import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectTestComponent } from './components/select-test.component';

import { SelectTestRoutingModule } from './select-test-routing';
import { MaterialModule } from './../material/material.module';

@NgModule({
    declarations: [
        SelectTestComponent,
    ],
    imports: [
        CommonModule,
        SelectTestRoutingModule,
        FormsModule,
        MaterialModule
    ]
})

export class SelectTestModule {}
