import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RulitTestComponent } from './components/rulit-test/rulit-test.component';
import { RulitInstructionsComponent } from './components/instructions/rulit-instructions.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'instrucciones', 
        pathMatch: 'full'
    },
    {
        path: ':id',
        redirectTo: 'test', 
        pathMatch: 'full'
    },
    {
        path: 'instrucciones',
        component: RulitInstructionsComponent
    },
    {
        path: 'test',
        component: RulitTestComponent
    }
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
