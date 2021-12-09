import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { EncodeRoutingModule } from './encode-routing.module';
import { EncodeWellcomeComponent } from './wellcome-component/encode-wellcome.component';

@NgModule({
    declarations: [
        EncodeWellcomeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        EncodeRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: []
})

export class EncodeDayTwoModule {}


