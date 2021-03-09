import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { RulitRoutingModule } from './rulit-routing.module';
import { RulitTestComponent } from './components/rulit-test/rulit-test.component';
import { RulitInstructionsComponent } from './components/rulit-instructions/rulit-instructions.component';
import { RulitUserService } from './bits/RulitUserService';
import { RulitUserFormComponent } from './components/rulit-user-form/rulit-user-form.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { ScreenOrientationDialogComponent } from './components/rulit-test/dialogs/orientation-dialog.component';
import { LongMemoryWellcomeDialogComponent } from './components/rulit-test/dialogs/long-memory-wellcome-dialog.component';
import { FinishTestDialogComponent } from './components/rulit-test/dialogs/finish-test-dialog.component';


// import { Graph } from './bits/Graph';

// Este modulo se encarga de llevar adelante los test RULIT
// 
// Ensayo 1:
//          - Mostrar instrucciones (instructions component)
//          - Datos usuario
//          - Aprendizaje
//          - Test 1 (memoria a corto plazo)
//
// Ensayo 2: 
//          - Buscar datos de usuario (segun url ej. /rulit/<<idUsuario>>)
//          - Test 2 (memoria a largo plazo)
//
// Guardar resultados.

@NgModule({
    declarations: [
        RulitInstructionsComponent,
        RulitUserFormComponent,
        RulitTestComponent,
        ScreenOrientationDialogComponent,
        FinishTestDialogComponent,
        LongMemoryWellcomeDialogComponent
    ],
    imports: [
        SharedModule,
        RulitRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        CommonModule
    ],
    exports: [],
    entryComponents: [
        ScreenOrientationDialogComponent
    ],
    providers: [ RulitUserService ]
})

export class RulitModule {}


