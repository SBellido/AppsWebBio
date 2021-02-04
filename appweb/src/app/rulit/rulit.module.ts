import { NgModule } from '@angular/core';

import { RulitRoutingModule } from './rulit-routing.module';
import { RulitComponent } from './components/rulit.component';
import { RulitLabComponent } from './components/laberinto/rulit-lab.component';
import { RulitInstructionsComponent } from './components/instructions/rulit-instructions.component';

import { GraphService } from './bits/GraphService';

import { SharedModule } from '../shared/shared.module';
import { TestService } from './bits/TestService';


@NgModule({
    declarations: [
        RulitComponent,
        RulitLabComponent,
        RulitInstructionsComponent
    ],
    imports: [
        RulitRoutingModule,
        SharedModule
    ],
    exports: [
        RulitComponent,
        RulitInstructionsComponent
    ],
    providers: [GraphService, TestService]
})

export class RulitModule {}


