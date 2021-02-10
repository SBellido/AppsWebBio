import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RulitTestComponent } from './components/rulit-test/rulit-test.component';
import { RulitInstructionsComponent } from './components/rulit-instructions/rulit-instructions.component';
import { RulitUserFormComponent } from "./components/rulit-user-form/rulit-user-form.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'instrucciones', 
        pathMatch: 'full'
    },
    {
        path: 'test/:id/:test/:exercise',
        component: RulitTestComponent
    },
    {
        path: 'instrucciones',
        component: RulitInstructionsComponent
    },
    {
        path: 'user-form',
        component: RulitUserFormComponent
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
