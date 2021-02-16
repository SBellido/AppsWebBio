import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { fromEvent, Observable } from 'rxjs';

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
    private clickCanvas$: Observable<Event>;
    
    private testService: TestService;

    constructor(
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private userService: RulitUserService ) {

            let userIdParam = +this.route.snapshot.paramMap.get('id');

            // When user enters the URL to make the long term memory test.
            //      - eg. /rulit/test/<<userId>>
            if ( ! this.userService.user ) {
                this.userService.loadUserFromDB(userIdParam);
            }

            // User in the service must be the same as the param 
            if ( ! ( this.userService.user.userId == userIdParam ) ) {
                this.router.navigate(['/']);
            }

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
        
        // Build the test 
        this.testService = new TestService(newGraph, currentSolution , this.ngZone, this.userService); 
        
        this.clickCanvas$ = fromEvent(this.labCanvas.nativeElement,'click');
        
        // Handles user new move
        this.clickCanvas$.subscribe( ( event: MouseEvent ) => { 
            this.testService.handleNewMove(event.clientX,event.clientY);
        });

        // Draw canvas when current node changes
        this.testService.graph.currentNode$.subscribe( () => { 
            this.testService.graph.draw(); 
        });

        // When exercise is over go to next one
        this.testService.exerciseChange$.subscribe( (isExerciseOver) => {
            if (isExerciseOver) this.goNextExercise(); 
        });
        
        // When test is over
        this.testService.testChange$.subscribe( (isTestOver) => {
            if ( isTestOver && this.userService.user.nextTest == "long_memory_test" ) { 
                alert("Current test is over, next test URL will be send by email.");
            } else {
                alert("All tests done.");
            }
        });
        
        // First Draw
        this.testService.graph.draw();

    }

    goNextExercise(){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['rulit/test',this.userService.user.userId]);
    }

}

