import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Graph } from '../../bits/Graph';
import { GraphService, INodeData } from '../../bits/GraphService';


@Component({
    selector: 'app-rulit-lab',
    templateUrl: './rulit-lab.component.html',
    styleUrls: ['rulit-lab.component.scss']
})

export class RulitLabComponent implements OnInit {

    @Input() GRAPH_DATA: Array<INodeData>;
    @ViewChild('labCanvas', { static: true }) 
    
    labCanvas: ElementRef<HTMLCanvasElement>;
    private context: CanvasRenderingContext2D;
    private graph: Graph;

    constructor(private graphService: GraphService) { 
        // Agarrar canvas, contexto
    }

    ngOnInit(): void {
        this.context = this.labCanvas.nativeElement.getContext('2d');
        this.graph = this.graphService.buildGraph(this.GRAPH_DATA,this.context);
        this.graph.draw();
    }

}

