import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalComponent } from './components/proposal/proposal.component'
import { UserComponent } from './user.components';


@NgModule({
    declarations: [
        UserComponent,
        ProposalComponent
    ],
    imports: [
        CommonModule,

    ]
})

export class UserModule {}
