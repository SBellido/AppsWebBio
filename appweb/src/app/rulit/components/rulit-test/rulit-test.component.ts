import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

import { fromEvent, interval, Observable, Subscription } from 'rxjs';
import { map, take, tap } from "rxjs/operators";

import { buildGraph } from 'src/app/rulit/bits/GraphUtils';
import { RulitTestService } from 'src/app/rulit/bits/RulitTestService';

import { GRAPH as GRAPH_DATA, SOLUTION } from "src/app/rulit/bits/graphs_available/Graph1_data_testing";
import { RulitUserService } from 'src/app/rulit/bits/RulitUserService';
import { ScreenOrientationDialogComponent } from './dialogs/orientation-dialog.component';

const MAX_CANVAS_HEIGHT = 480;
const MAX_MOBILE_SCREEN_WIDTH = 768;

@Component({
    selector: 'app-rulit-test',
    templateUrl: './rulit-test.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitTestComponent implements OnInit, AfterViewChecked, OnDestroy {

    @ViewChild('canvas', { static: true }) private canvas: ElementRef<HTMLCanvasElement>;
    private clickCanvas$: Observable<Event>;
    private orientationChange$: Subscription;
    private metaviewport: HTMLMetaElement = document.querySelector('meta[name="viewport"]');
    
    countDown: number = 3;
    testStarted: boolean = false;

    private testService: RulitTestService;

    constructor(
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private userService: RulitUserService,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _breakpointObserver: BreakpointObserver,
        private _mediaMatcher: MediaMatcher ) {

            let userIdParam = this.route.snapshot.paramMap.get('id');

            // When user enters the URL to make the long term memory test.
            //      - eg. /rulit/test/<<userId>>
            if ( ! this.userService.user ) {
                this.userService.loadUserFromDB(userIdParam);
            }

        }

    ngOnInit(): void {
        
        let orientationDialogRef: MatDialogRef<ScreenOrientationDialogComponent> = null;
        
        this.orientationChange$ = this._breakpointObserver.observe([
            Breakpoints.HandsetPortrait
        ]).subscribe( (result) => {
            if ( result.matches ) {
                orientationDialogRef = this.openScreenOrientationDialog();
            } else {
                if ( orientationDialogRef ) orientationDialogRef.close();
                if ( ! this.testService ) this.initTest();
            }
        });

    }

    // Dialogs

    private openScreenOrientationDialog(): MatDialogRef<ScreenOrientationDialogComponent, any> {
        this.metaviewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
        // TODO: estilos
        const config = new MatDialogConfig();
        config.panelClass = ["custom-rulit-dialog"];
        config.disableClose = true;
        return this._dialog.open(ScreenOrientationDialogComponent, config);
    }

    private async initTest() {

        await this.countdown();

        this.setCanvasSize();
        
        let theGraph = await buildGraph(GRAPH_DATA,this.canvas);
        
        // Copies solutions to a new array 
        let currentSolution = Object.assign([],SOLUTION);
        
        // Build the test 
        this.testService = new RulitTestService(theGraph, currentSolution , this.ngZone, this.userService, this._snackBar, this._dialog); 
        
        this.clickCanvas$ = fromEvent(this.canvas.nativeElement,"click");
        
        // Handles user new click
        this.clickCanvas$.subscribe( ( event: MouseEvent ) => { 
            this.testService.handleNewClick(event.clientX,event.clientY);
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
            this.userService.saveTestData();
        });

        // On desktop screens, when mouse move:
        //      - set cursor to pointer if over a node
        if (screen.width >= MAX_MOBILE_SCREEN_WIDTH){
            fromEvent(this.canvas.nativeElement,"mousemove")
                .subscribe( (event: MouseEvent ) => { this.ngZone.runOutsideAngular( () => { 

                        let newNode = this.testService.graph.getNodeAtPosition(event.clientX,event.clientY);
        
                        // Theres a node
                        if ( newNode ) {
                            this.canvas.nativeElement.style.cursor = "pointer";
                            this.testService.graph.highlightPathTo(newNode);
                            this.testService.graph.draw();
                        } 
                        else 
                        {
                            this.canvas.nativeElement.style.cursor = "default";
                            this.testService.graph.resetHighlights();
                            this.testService.graph.draw();
                        }
                    }

                )}
            );
        }

        // Test starts with first node selected
        this.testService.setCurrentNode(this.testService.graph.firstNode);

        // First Draw
        this.testService.graph.draw();

        this.testStarted = true;

    }
    
    // Based on window size, sets the canvas used for the graph
    private setCanvasSize() {
        
        const mediaQueryList = this._mediaMatcher.matchMedia(`(max-height: ${MAX_CANVAS_HEIGHT}px) and (orientation: landscape)`);

        if ( mediaQueryList.matches ) {
            // Has to do this compare because safari and chrome gives different results
            let screenHeight = (window.screen.height < window.screen.width) ? window.screen.height: window.screen.width;
            this.canvas.nativeElement.width = (screenHeight * 0.9) * 1.4;
            this.canvas.nativeElement.height = screenHeight * 0.9;
        }
        else
        {
            this.canvas.nativeElement.width = 672;
            this.canvas.nativeElement.height = 480;
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
            this.canvas.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    ngOnDestroy(): void {
        this.metaviewport.content = 'width=device-width, initial-scale=1.0';
        this.orientationChange$.unsubscribe();
    }

}

