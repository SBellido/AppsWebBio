import { Component, OnInit } from '@angular/core';

//
import { GRAFO as GRAPH_DATA } from "../bits/dataGrafo1";


@Component({
    selector: 'app-test-rulit',
    templateUrl: './testRulit.component.html',
    styleUrls: ['testRulit.component.scss']
})

// Este componente se encarga de llevar adelante los ensayos
// 
// Ensayo 1:
//          - Mostrar instrucciones (?)
//          - Datos usuario
//          - Aprendizaje
//          - Test 1 (memoria a corto plazo)
//
// Ensayo 2: 
//          - Buscar datos de usuario (segun url ej. /test-rulit/<<idUsuario>>)
//          - Test 2 (memoria a largo plazo)
//
// Guardar resultados.

export class TestRulitComponent implements OnInit {

    private GRAPH_DATA: Array<any>;

    constructor() { 
        this.GRAPH_DATA = GRAPH_DATA;
    }

    ngOnInit(): void {
       
    }

}

