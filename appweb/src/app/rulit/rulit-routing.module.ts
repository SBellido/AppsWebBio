import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RulitComponent } from './components/rulit.component';

const routes: Routes = [
    {
        path: '',
        component: RulitComponent
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class RulitRoutingModule {}
