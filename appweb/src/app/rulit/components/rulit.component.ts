import { Component, OnInit } from '@angular/core';
import { IGraphNode } from '../bits/Graph';

//
// import { GRAPH as GRAPH_DATA } from "../bits/graphs_available/Graph1_data";
import { GRAPH as GRAPH_DATA } from "../bits/graphs_available/Graph1_data_testing";
import { TestService } from '../bits/TestService';


// Este componente se encarga de llevar adelante los ensayos
// 
// Ensayo 1:
//          - Mostrar instrucciones
//          - Datos usuario
//          - Aprendizaje
//          - Test 1 (memoria a corto plazo)
//
// Ensayo 2: 
//          - Buscar datos de usuario (segun url ej. /rulit/<<idUsuario>>)
//          - Test 2 (memoria a largo plazo)
//
// Guardar resultados.

@Component({
    selector: 'app-rulit',
    templateUrl: './rulit.component.html',
    styleUrls: ['rulit.component.scss']
})

export class RulitComponent implements OnInit {

    GRAPH_DATA: Array<IGraphNode>;

    constructor(private testService: TestService) { 
        this.GRAPH_DATA = GRAPH_DATA;
    }

    ngOnInit(): void {
    }

}

