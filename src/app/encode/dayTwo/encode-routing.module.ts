import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncodeWellcomeComponent } from './wellcome-component/encode-wellcome.component';
import { EncodeAuthGuard } from "../encode-auth.guard";
import { ExitGuard } from '../exit.guard';
import { EncodeAbandonedGuard } from '../encode-abandoned.guard';


const routes: Routes = [
    {
        path: ':userId',
        canActivate: [ EncodeAuthGuard, EncodeAbandonedGuard ], 
        children: [
            {
                path: 'bienvenido',
                component: EncodeWellcomeComponent
            }
        ]
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

export class EncodeRoutingModule {}
