import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompileDirectiveMetadata } from '@angular/compiler';
import { HomeComponent } from './components/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
        CompileDirectiveMetadata
    ]
})

export class HomeRoutingModule {}
