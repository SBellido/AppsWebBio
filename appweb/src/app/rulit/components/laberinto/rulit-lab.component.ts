import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Graph } from '../../bits/Graph';
import { GraphService, INodeCoordinate, INodeData } from '../../bits/GraphService';

const CANVAS_WIDTH = 650;
const CANVAS_HEIGHT = 450;

@Component({
    selector: 'app-rulit-lab',
    templateUrl: './rulit-lab.component.html',
    styleUrls: ['rulit-lab.component.scss']
})

export class RulitLabComponent implements OnInit {

    @Input() GRAPH_DATA: Array<INodeData>;
    @Input() GRAPH_COORDINATES: Array<INodeCoordinate>;
    @ViewChild('labCanvas', { static: true }) 
    
    labCanvas: ElementRef<HTMLCanvasElement>;
    private context: CanvasRenderingContext2D;
    private graph: Graph;

    constructor(private graphService: GraphService) {}

    ngOnInit(): void {
        this.labCanvas.nativeElement.width = CANVAS_WIDTH;
        this.labCanvas.nativeElement.height = CANVAS_HEIGHT;
        this.context = this.labCanvas.nativeElement.getContext('2d');
        this.context.moveTo(0,0);
        this.context.save();
        this.graph = this.graphService.buildGraph(this.GRAPH_DATA,this.context);
        this.graph.draw();
    }

    handleClick(event: MouseEvent){
        let bx = this.labCanvas.nativeElement.getBoundingClientRect();
        let mousePosition = {
            x: event.clientX - bx.left,
            y: event.clientY - bx.top
        }
        console.log( this.graph.nodes.map( node => node.circle.isPointInside( mousePosition ) ));
    }

}

