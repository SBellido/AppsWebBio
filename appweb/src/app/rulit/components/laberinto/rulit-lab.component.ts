import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IGraphNode } from '../../bits/Graph';
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
    
    labCanvas: ElementRef<HTMLCanvasElement>;
    private context: CanvasRenderingContext2D;

    constructor(private testService: TestService) {}

    ngOnInit(): void {

        this.labCanvas.nativeElement.width = CANVAS_WIDTH;
        this.labCanvas.nativeElement.height = CANVAS_HEIGHT;
        this.context = this.labCanvas.nativeElement.getContext('2d');
        
        this.testService.buildGraph(this.GRAPH_DATA,this.context);
        this.testService.drawGraph();
    }

    // Handles user new move
    handleClick(event: MouseEvent){
        let bx = this.labCanvas.nativeElement.getBoundingClientRect();
        let mousePosition = {
            x: event.clientX - bx.left,
            y: event.clientY - bx.top
        }

        this.testService.handleNewMove(mousePosition);

    }

}

