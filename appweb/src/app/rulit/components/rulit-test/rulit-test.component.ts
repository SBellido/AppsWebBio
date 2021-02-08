import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

import { buildGraph } from '../../bits/GraphUtils';
import { TestService } from '../../bits/TestService';

import { GRAPH as GRAPH_DATA, SOLUTION } from "../../bits/graphs_available/Graph1_data_testing";

const CANVAS_WIDTH = 652;
const CANVAS_HEIGHT = 472;

@Component({
    selector: 'app-rulit-test',
    templateUrl: './rulit-test.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitTestComponent implements OnInit {

    @ViewChild('labCanvas', { static: true }) 
    
    private labCanvas: ElementRef<HTMLCanvasElement>;
    private testService: TestService;

    private clickCanvas$: Observable<Event>;
    
    constructor(private ngZone: NgZone) {}

    ngOnInit(): void {

        this.labCanvas.nativeElement.width = CANVAS_WIDTH;
        this.labCanvas.nativeElement.height = CANVAS_HEIGHT;
        
        let newGraph = buildGraph(GRAPH_DATA,this.labCanvas);
        
        this.testService = new TestService(newGraph, SOLUTION, this.ngZone);
        
        this.clickCanvas$ = fromEvent(this.labCanvas.nativeElement,'click');
        
        // Handles user new move
        this.clickCanvas$.subscribe( ( event: MouseEvent ) => { this.testService.handleNewMove(event.clientX,event.clientY) });

        // When current node changes:
        //      - Update the solution array (markAsVisited)
        //      - Draw canvas
        this.testService.graphCurrentNode$
            .subscribe( () => { 
                this.testService.markAsVisited();
                this.testService.drawGraph();
            });
        
        // First Draw
        this.testService.drawGraph();

    }

}

