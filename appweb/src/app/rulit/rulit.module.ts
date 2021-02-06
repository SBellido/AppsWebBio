import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { RulitRoutingModule } from './rulit-routing.module';
import { RulitTestComponent } from './components/rulit-test/rulit-test.component';
import { RulitInstructionsComponent } from './components/instructions/rulit-instructions.component';

import { Graph } from './bits/Graph';

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
        RulitTestComponent,
        RulitInstructionsComponent
    ],
    imports: [
        RulitRoutingModule,
        SharedModule
    ],
    exports: [
        RulitTestComponent,
        RulitInstructionsComponent
    ],
    providers: [Graph]
})

export class RulitModule {}


