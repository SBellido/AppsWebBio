import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { buildGraph } from '../../bits/GraphUtils';
import { TestService } from '../../bits/TestService';

import { GRAPH as GRAPH_DATA, SOLUTION } from "../../bits/graphs_available/Graph1_data_testing";
import { RulitUserService } from '../../bits/RulitUserService';
import { fakeAsync } from '@angular/core/testing';

const MAX_CANVAS_HEIGHT = 480;

@Component({
    selector: 'app-rulit-test',
    templateUrl: './rulit-test.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitTestComponent implements OnInit {

    @ViewChild('labCanvas', { static: true }) 
    private labCanvas: ElementRef<HTMLCanvasElement>;
    private clickCanvas$: Observable<Event>;
    // private screenOrientationChange$: Observable<OrientationType>;

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

            // this.screenOrientationChange$ = fromEvent(window,"orientationchange").pipe(
            //     map( e => e.target.screen.orientation.type )
            // );

        }

    ngOnInit(): void {
        
        if (this.isScreenOrientationValid()) this.initTest();

    }
    
    private isScreenOrientationValid(): boolean {

        let orientation = window.screen.orientation.type;
        let screenWidth = window.screen.width;

        if (orientation === "landscape-primary" || 
                (screenWidth >= 768) && (orientation === "portrait-secondary" || orientation === "portrait-primary") ) {
            console.log("That looks good.");
            // alert(orientation);
            return true;
        } 
        
        // alert(orientation);
        return false;
        
        // else {

        //     let isScreenLandscape = false;
        //     let messageText;

        //     this.screenOrientationChange$.subscribe( orientation => {
        //         console.log(orientation);
        //     });
            

            // while ( ! isScreenLandscape ) {
                
                
            //     this.screenOrientationChange$.subscribe( (orientation) => {   
                
            //         // TODO: si esta con el celular:
            //         //      - aparezca el cartelito que aparece al principio. 
    
            //         // let orientation = (e.target.screen.orientation || {}).type ;
    
            //         if (orientation === "landscape-primary" ) {
            //             isScreenLandscape = true;
            //         } else if (orientation === "landscape-secondary") {
            //             messageText = "Mmmh... the screen is upside down!";
            //         } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
            //             messageText = "Mmmh... you should rotate your device to landscape";
            //         } else if (orientation === undefined) {
            //             messageText = "The orientation API isn't supported in this browser :(";
            //         }
                    
            //     // });

            //     console.log(messageText);

            // }

        // }

    }

    private initTest(): void {

        this.setCanvasSize();
        
        let theGraph = buildGraph(GRAPH_DATA,this.labCanvas);
        
        // Copies solutions to a new array 
        let currentSolution = Object.assign([],SOLUTION);
        
        // Build the test 
        this.testService = new TestService(theGraph, currentSolution , this.ngZone, this.userService); 
        
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
    
    // Based on window size, sets the canvas used for the graph
    private setCanvasSize() {
        
        let screenHeight = screen.height;
        
        if ( screenHeight >= MAX_CANVAS_HEIGHT ) {

            this.labCanvas.nativeElement.width = 672;
            this.labCanvas.nativeElement.height = 480;

        } else {

            this.labCanvas.nativeElement.width = (screenHeight * 0.9) * 1.4;
            this.labCanvas.nativeElement.height = screenHeight * 0.9;

        }

    }

    private goNextExercise(){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['rulit/test',this.userService.user.userId]);
    }

}

