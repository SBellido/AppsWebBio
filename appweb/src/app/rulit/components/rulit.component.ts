import { Component, OnInit } from '@angular/core';

//
import { GRAFO as GRAPH_DATA } from "../bits/dataGrafo1";
import { INodeData } from "../bits/GraphService";

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

@Component({
    selector: 'app-rulit',
    templateUrl: './rulit.component.html',
    styleUrls: ['rulit.component.scss']
})

export class RulitComponent implements OnInit {

    GRAPH_DATA: Array<INodeData>;

    constructor() { 
        this.GRAPH_DATA = GRAPH_DATA;
    }

    ngOnInit(): void {
       
    }

}

