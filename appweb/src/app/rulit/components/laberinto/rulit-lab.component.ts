import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { Graph, IGraphNode } from '../../bits/Graph';
import { GraphService } from '../../bits/GraphService';

const CANVAS_WIDTH = 652;
const CANVAS_HEIGHT = 472;

@Component({
    selector: 'app-rulit-lab',
    template: '<canvas #labCanvas (click)="handleClick($event)"></canvas>'
})

export class RulitLabComponent implements OnInit {

    @Input() GRAPH_DATA: Array<IGraphNode>;
    @Output() currentNode: EventEmitter<number>;

    @ViewChild('labCanvas', { static: true }) 
    
    labCanvas: ElementRef<HTMLCanvasElement>;
    private context: CanvasRenderingContext2D;
    private graph: Graph;

    constructor(private graphService: GraphService) {
        this.currentNode = new EventEmitter<number>();
    }

    ngOnInit(): void {
        this.labCanvas.nativeElement.width = CANVAS_WIDTH;
        this.labCanvas.nativeElement.height = CANVAS_HEIGHT;
        this.context = this.labCanvas.nativeElement.getContext('2d');
        // this.context.moveTo(2,2);
        // this.context.save();
        this.graph = this.graphService.buildGraph(this.GRAPH_DATA,this.context);
        this.graph.draw();
    }

    // Outputs the node clicked by the user
    handleClick(event: MouseEvent){
        let bx = this.labCanvas.nativeElement.getBoundingClientRect();
        let mousePosition = {
            x: event.clientX - bx.left,
            y: event.clientY - bx.top
        }
        // Agregarle al grafo una funcion que devuelva el nodo clickeado y despues emitirlo.
        
        // this.currentNode.emit( this.graph.searchNodeInPosition(mousePosition) );

        // this.graph.nodes.map( node => node.circle.isPointInside( mousePosition ));
    }

}

