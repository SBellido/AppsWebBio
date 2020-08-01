import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructionsCreativityComponent } from './components/instructionsCreativity.component';
import { ElementComponent } from './../testCreativity/components/element/element.component';
const routes: Routes = [
    {
        path: '',
        component: InstructionsCreativityComponent
    },
    {
        path: 'elements/:code',
        component: ElementComponent 
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

export class InstructionsCreativityRoutingModule {}
