import { NgModule } from '@angular/core';

import { RulitRoutingModule } from './rulit-routing.module';
import { RulitComponent } from './components/rulit.component';
import { RulitLabComponent } from './components/laberinto/rulit-lab.component';
import { GraphService } from './bits/GraphService';

import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        RulitComponent,
        RulitLabComponent
    ],
    imports: [
        RulitRoutingModule,
        SharedModule
    ],
    exports: [
        RulitComponent
    ],
    providers: [GraphService]
})

export class RulitModule {}


