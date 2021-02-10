import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { fromEvent, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { buildGraph } from '../../bits/GraphUtils';
import { TestService } from '../../bits/TestService';

import { GRAPH as GRAPH_DATA, SOLUTION } from "../../bits/graphs_available/Graph1_data_testing";
import { RulitUserService } from '../../bits/RulitUserService';


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
    
    // URL Parameters
    private userParam: number;
    private testNumberParam: number;
    private exerciseNumberParam: number;
    
    constructor(
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private userService: RulitUserService ) {

            this.userParam = +this.route.snapshot.paramMap.get('id');
            this.testNumberParam = +this.route.snapshot.paramMap.get('test');
            this.exerciseNumberParam = +this.route.snapshot.paramMap.get('exercise');

        }

    ngOnInit(): void {
        
        this.initTest();

    }

    private initTest(): void {
        
        this.labCanvas.nativeElement.width = CANVAS_WIDTH;
        this.labCanvas.nativeElement.height = CANVAS_HEIGHT;
        
        let newGraph = buildGraph(GRAPH_DATA,this.labCanvas);
        
        // Copies solutions to a new array 
        let currentSolution = Object.assign([],SOLUTION);
        
        this.testService = new TestService(newGraph, currentSolution , this.ngZone);
        
        this.clickCanvas$ = fromEvent(this.labCanvas.nativeElement,'click');
        
        // Handles user new move
        this.clickCanvas$.subscribe( ( event: MouseEvent ) => { 
            this.testService.handleNewMove(event.clientX,event.clientY);
        });

        // Draw canvas when current node changes
        this.testService.graphCurrentNode$.subscribe( () => { 
            this.testService.drawGraph(); 
        });
        
        // First Draw
        this.testService.drawGraph();

    }

    goNextExercise(){
        let nexEN = this.exerciseNumberParam + 1;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['rulit/test',this.userParam,this.testNumberParam,nexEN]);
    }

}

