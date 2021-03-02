import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { fromEvent, interval, Observable, Subscription } from 'rxjs';
import { map, take, tap } from "rxjs/operators";

import { buildGraph } from '../../bits/GraphUtils';
import { TestService } from '../../bits/TestService';

import { GRAPH as GRAPH_DATA, SOLUTION } from "../../bits/graphs_available/Graph1_data_testing";
import { RulitUserService } from '../../bits/RulitUserService';
import { ScreenOrientationDialogComponent } from './dialogs/orientation-dialog.component';


const MAX_CANVAS_HEIGHT = 480;
const MAX_MOBILE_SCREEN_WIDTH = 768;

@Component({
    selector: 'app-rulit-test',
    templateUrl: './rulit-test.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitTestComponent implements OnInit, AfterViewChecked, OnDestroy {

    @ViewChild('labCanvas', { static: true }) 
    private labCanvas: ElementRef<HTMLCanvasElement>;
    private clickCanvas$: Observable<Event>;
    private orientationChange$: Subscription;
    private metaviewport: HTMLMetaElement = document.querySelector('meta[name="viewport"]');
    
    countDown: number = 3;
    testStarted: boolean = false;

    private testService: TestService;

    constructor(
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private userService: RulitUserService,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar ) {

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

        let screen = window.screen;
        let dialogRef = null;

        if ( this.isScreenOrientationValid(screen.orientation) ) {
            this.initTest(); 
        } else {
            dialogRef = this.openScreenOrientationDialog();
        }
        
        this.orientationChange$ = fromEvent(window,"orientationchange").subscribe( () => {
            if (this.isScreenOrientationValid(screen.orientation) && dialogRef ) {
                this.closeScreenOrientationDialog(dialogRef);
                
                if ( ! this.testService) this.initTest();
            } else if ( ! dialogRef || dialogRef.getState() === 2 ){
                dialogRef = this.openScreenOrientationDialog();
            }
        });

    }

    private openScreenOrientationDialog(): MatDialogRef<ScreenOrientationDialogComponent, any> {
        this.metaviewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
        return this._dialog.open(ScreenOrientationDialogComponent);
    }
    
    private closeScreenOrientationDialog(dialogRef: MatDialogRef<ScreenOrientationDialogComponent, any>): void {
        dialogRef.close();
    }
    
    // Checks if the mobile screen is in the correct position.
    private isScreenOrientationValid(orientation : ScreenOrientation): boolean {

        let orientationType = orientation.type;

        if (orientationType === "landscape-primary" || orientationType === "landscape-secondary" ||
            (screen.width >= MAX_MOBILE_SCREEN_WIDTH) && ( screen.orientation.type === "portrait-secondary" || screen.orientation.type === "portrait-primary" ) ) {
            return true;
        } 
        
        return false;
        
    }

    private async initTest() {

        await this.countdown();

        this.setCanvasSize();
        
        let theGraph = await buildGraph(GRAPH_DATA,this.labCanvas);
        
        // Copies solutions to a new array 
        let currentSolution = Object.assign([],SOLUTION);
        
        // Build the test 
        this.testService = new TestService(theGraph, currentSolution , this.ngZone, this.userService, this._snackBar); 
        
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

        // Test starts with first node selected
        this.testService.setCurrentNode(this.testService.graph.firstNode);

        // First Draw
        this.testService.graph.draw();

        this.testStarted = true;

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

    private countdown() {
        
        let countdownStart = 3;
        
        return interval(1000).pipe(
            take(countdownStart + 1),
            map(i => countdownStart - i),
            tap( i => { this.countDown = i } )
        ).toPromise();

    }

    ngAfterViewChecked(): void {
        // scrool to the graph
        if (this.testService)
            this.labCanvas.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    ngOnDestroy(): void {
        this.metaviewport.content = 'width=device-width, initial-scale=1.0';
        this.orientationChange$.unsubscribe();
    }

}

