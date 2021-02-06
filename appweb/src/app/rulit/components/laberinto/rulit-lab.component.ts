import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IGraphNode } from '../../bits/Graph';
import { GraphService } from '../../bits/GraphService';
import { TestService } from '../../bits/TestService';

const CANVAS_WIDTH = 652;
const CANVAS_HEIGHT = 472;

@Component({
    selector: 'app-rulit-lab',
    template: '<canvas #labCanvas (click)="handleClick($event)"></canvas>'
})

export class RulitLabComponent implements OnInit {

    @Input() GRAPH_DATA: Array<IGraphNode>;

    @ViewChild('labCanvas', { static: true }) 
    
    private _labCanvas: ElementRef<HTMLCanvasElement>;
    private _testService: TestService;
    
    constructor(private _graphService: GraphService) {}

    ngOnInit(): void {

        this._labCanvas.nativeElement.width = CANVAS_WIDTH;
        this._labCanvas.nativeElement.height = CANVAS_HEIGHT;
        
        let newGraph = this._graphService.buildGraph(this.GRAPH_DATA,this._labCanvas);
        
        this._testService = new TestService(newGraph);
        
        this._testService.graphCurrentNode$.subscribe(() => { this._testService.drawGraph() });
        this._testService.drawGraph();

    }

    // Handles user new move
    handleClick(event: MouseEvent){
        this._testService.handleNewMove(event.clientX,event.clientY);
    }

}

