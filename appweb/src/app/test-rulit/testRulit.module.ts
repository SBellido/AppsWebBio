import { NgModule } from '@angular/core';

import { TestRulitRoutingModule } from './testRulit-routing.module';
import { TestRulitComponent } from './components/testRulit.component';
import { RulitLabComponent } from './components/laberinto/rulitLab.component';


@NgModule({
    declarations: [
        TestRulitComponent,
        RulitLabComponent
    ],
    imports: [
        TestRulitRoutingModule
    ],
    exports: [
        TestRulitComponent
    ],
    // providers: [DataDbService]
})

export class TestRulitModule {}


