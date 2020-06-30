import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProposalComponent } from './components/proposal/components/proposal.component';
import { UserComponent } from './components/user.components';


@NgModule({
    declarations: [
        UserComponent,
        ProposalComponent
    ],
    imports: [
        CommonModule,
        FormsModule

    ]
})

export class UserModule {}
