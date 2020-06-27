import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectTestComponent } from './components/select-test.component';

import { SelectTestRoutingModule } from './select-test-routing';

@NgModule({
    declarations: [
        SelectTestComponent,
    ],
    imports: [
        CommonModule,
        SelectTestRoutingModule,
        FormsModule
    ]
})

export class SelectTestModule {}
