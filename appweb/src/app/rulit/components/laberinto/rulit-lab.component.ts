import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

import { IGraphNode } from '../../bits/Graph';
import { buildGraph } from '../../bits/GraphUtils';
import { TestService } from '../../bits/TestService';

const CANVAS_WIDTH = 652;
const CANVAS_HEIGHT = 472;

@Component({
    selector: 'app-rulit-lab',
    template: '<canvas #labCanvas></canvas>'
})

export class RulitLabComponent implements OnInit {

    @Input() GRAPH_DATA: Array<IGraphNode>;

    @ViewChild('labCanvas', { static: true }) 
    
    private labCanvas: ElementRef<HTMLCanvasElement>;
    private testService: TestService;

    private clickCanvas: Observable<Event>;
    
    constructor() {}

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

