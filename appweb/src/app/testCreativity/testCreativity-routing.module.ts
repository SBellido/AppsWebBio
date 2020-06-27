import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestCreativityComponent } from './components/testCreativity.component';

const routes: Routes = [
    {
        path: '',
        component: TestCreativityComponent
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

export class TestCreativityRoutingModule {}
