import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './../../../material/material.module';

import { ProposalComponent } from './components/proposal/components/proposal.component';
import { UserComponent } from './components/user.components';

@NgModule({
    declarations: [
        UserComponent,
        ProposalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
    ],
})

export class UserModule {}
