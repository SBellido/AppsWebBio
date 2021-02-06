import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { RulitRoutingModule } from './rulit-routing.module';
import { RulitComponent } from './components/rulit.component';
import { RulitLabComponent } from './components/laberinto/rulit-lab.component';
import { RulitInstructionsComponent } from './components/instructions/rulit-instructions.component';

import { TestService } from './bits/TestService';
import { Graph } from './bits/Graph';


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
    providers: [TestService, Graph]
})

export class RulitModule {}


