import { Component, Input, OnInit } from '@angular/core';
import { Graph } from '../../bits/Graph';
import { GraphService, INodeData } from '../../bits/GraphService';


@Component({
    selector: 'app-rulit-lab',
    templateUrl: './rulitLab.component.html',
    styleUrls: ['rulitLab.component.scss']
})

export class RulitLabComponent implements OnInit {

    @Input() GRAPH_DATA: Array<INodeData>;
    private graph: Graph;

    constructor(private graphService: GraphService) { 
        // Agarrar canvas, contexto
    }

    ngOnInit(): void {
        // this.graph = this.graphService.buildGraph(this.GRAPH_DATA,context);
    }

}

