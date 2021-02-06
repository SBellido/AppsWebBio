import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

import { IGraphNode } from '../../bits/Graph';
import { buildGraph } from '../../bits/GraphUtils';
import { TestService } from '../../bits/TestService';

import { GRAPH as GRAPH_DATA } from "../../bits/graphs_available/Graph1_data_testing";

const CANVAS_WIDTH = 652;
const CANVAS_HEIGHT = 472;

@Component({
    selector: 'app-rulit-test',
    templateUrl: './rulit-test.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitTestComponent implements OnInit {

    private GRAPH_DATA: Array<IGraphNode>;

    @ViewChild('labCanvas', { static: true }) 
    
    private labCanvas: ElementRef<HTMLCanvasElement>;
    private testService: TestService;

    private clickCanvas: Observable<Event>;
    
    constructor() {
        this.GRAPH_DATA = GRAPH_DATA;
    }

    ngOnInit(): void {

        this.labCanvas.nativeElement.width = CANVAS_WIDTH;
        this.labCanvas.nativeElement.height = CANVAS_HEIGHT;
        
        let newGraph = buildGraph(this.GRAPH_DATA,this.labCanvas);
        
        this.testService = new TestService(newGraph);
        
        this.clickCanvas = fromEvent(this.labCanvas.nativeElement,'click');
        
        // Handles user new move
        this.clickCanvas.subscribe(( event: MouseEvent) => { this.testService.handleNewMove(event.clientX,event.clientY) });

        // Redraw canvas when current node changes
        this.testService.graphCurrentNode$.subscribe(() => { this.testService.drawGraph() });
        this.testService.drawGraph();

    }

}

