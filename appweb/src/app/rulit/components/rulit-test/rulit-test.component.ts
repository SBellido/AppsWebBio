import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

import { fromEvent, interval, Observable, Subscription } from 'rxjs';
import { filter, map, take, tap } from "rxjs/operators";

// import { RulitTestService } from 'src/app/rulit/bits/RulitTestService';

// import { GRAPH as GRAPH_DATA, SOLUTION } from "src/app/rulit/bits/graphs_available/Graph1_data_testing";
import { RulitUserService } from 'src/app/rulit/bits/RulitUserService';
import { ScreenOrientationDialogComponent } from './dialogs/orientation-dialog.component';
import { LongMemoryWellcomeDialogComponent } from './dialogs/long-memory-wellcome-dialog.component';
import { RulitTestService } from '../../bits/RulitTestService';
import { GraphNode } from '../../bits/GraphNode';
import { NotConnectedNodeDialogComponent } from './dialogs/not-connected-node-dialog.component';
import { FinishTestDialogComponent } from './dialogs/finish-test-dialog.component';

const MAX_CANVAS_HEIGHT = 480;
const MAX_MOBILE_SCREEN_WIDTH = 768;

@Component({
    selector: 'app-rulit-test',
    templateUrl: './rulit-test.component.html',
    styleUrls: ['../rulit.component.scss']
})

export class RulitTestComponent implements OnInit, AfterViewChecked, OnDestroy {

    @ViewChild('countdown') private _countdown: ElementRef<HTMLElement>;
    @ViewChild('canvas', { static: true }) private canvas: ElementRef<HTMLCanvasElement>;
    private clickCanvas$: Observable<Event>;
    private orientationChange$: Subscription;
    private exerciseChange$: Subscription;
    private testChange$: Subscription;
    private metaviewport: HTMLMetaElement = document.querySelector('meta[name="viewport"]');
    
    countDown: number = 3;
    testStarted: boolean = false;

    // private testService: RulitTestService;

    constructor(
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private userService: RulitUserService,
        private _testService: RulitTestService,
        private _dialog: MatDialog,
        private _breakpointObserver: BreakpointObserver,
        private _mediaMatcher: MediaMatcher ) {}

    async ngOnInit(): Promise<void> {
        
        // When user enters the URL for the long term memory test.
        //      - eg. /rulit/test/<<userId>>
        if ( ! this.userService.user ) {
            let userIdParam = this.route.snapshot.paramMap.get('userId');
            await this.userService.loadUserFromDB(userIdParam);
        }

        // TODO: Cambiar la segunda condicion por: ! this._testService.isTesting
        if ( this.userService.user.nextTest === "long_memory_test" && this.userService.user.longMemoryTest.length === 0 ) {
            await this.openLongMemoryWellcomeDialog().afterClosed().toPromise();
        }

        // TODO: observe only for mobile devices using mediaMatcher
        // Test inits if the mobile is landscape
        let orientationDialogRef: MatDialogRef<ScreenOrientationDialogComponent> = null;
        
        this.orientationChange$ = this._breakpointObserver.observe([
            Breakpoints.HandsetPortrait
        ]).subscribe( (result) => {
            if ( result.matches ) {
                orientationDialogRef = this.openScreenOrientationDialog();
            } else {
                if ( orientationDialogRef ) {
                    orientationDialogRef.close();
                }
                if ( ! this._testService.isTesting ) this.initTest();
            }
        });

    }

    private async initTest() {

        await this.countdown();

        this.setCanvasSize();
        
        await this._testService.initGraph(this.canvas);
        
        // Observers
        this.clickCanvas$ = fromEvent(this.canvas.nativeElement,"click");
        
        // Handles user new click
        this.clickCanvas$
            .pipe( 
                map( (ev: MouseEvent) => { 
                    return this._testService.graph.getNodeAtPosition(ev.clientX,ev.clientY);
                }),
                filter ( (node: GraphNode | undefined ) => node !== undefined )
            )
            .subscribe({ 
                next: (node) => { 
                    if (this._testService.isNodeNextInSolution(node)) {
                        this._testService.setActiveNode(node);
                        this._testService.graph.draw();
                    }
                    else
                    {
                        this._testService.registerError(this.userService.user);
                        if (this._testService.graph.isActiveNodeNextTo(node)) {
                            this._testService.graph.flickerNode(node);
                        }
                        else
                        {
                            this.openNotConnectedNodeDialog();
                        }
                    }
                }
            }
        );
        
        // When exercise is over go to next one
        this.exerciseChange$ = this._testService.isExerciseOver$
            .pipe(
                filter( (isExerciseOver) => isExerciseOver === true ),
                tap( () => {
                    if (this._testService.testName === "learning") 
                        this.userService.user.nextTest = "short_memory_test";
                })
            )
            .subscribe({
                next: () => {
                    this._testService.isTesting = false;
                    this.goNextExercise();
                    this.exerciseChange$.unsubscribe();
                }
            }
        );

        // When test is over go to next one
        this.testChange$ = this._testService.isTestOver$
            .pipe( 
                filter( (testOver) => testOver !== null ) )
            .subscribe( { 
                next: (testOver) => {
                    if ( this._testService.testName === "short_memory_test" ) {
                        this.userService.user.nextTest = "long_memory_test";
                        if ( testOver === "MAX_CORRECT_EXERCISES" ) {
                            this.openFinishTestDialog("Completaste la prueba","Perfecto has terminado el laberinto sin ayuda dos veces. Mañana nos encontramos nuevamente.");
                        }
                        else if ( testOver === "MAX_EXERCISES" ) {
                            this.openFinishTestDialog("Completaste la prueba","Muchas gracias por participar, ya ha practicado suficiente. Mañana nos encontramos nuevamente.");
                        }
                    }
                    this._testService.isTesting = false;
                    this.userService.saveTestData();
                }
            }
        );
        
        // 
        this._testService.startTest(this.userService);

        // Test starts with first node selected
        this._testService.setActiveNode(this._testService.graph.firstNode);

        // First Draw
        this._testService.graph.draw();

        this.testStarted = true;

    }
    
    // Based on window size, sets the canvas used for the graph
    private setCanvasSize(): void {
        
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

    private goNextExercise(): void {
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
        // scroll to the graph
        if ( this.testStarted )
            this.canvas.nativeElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        if ( ! this.testStarted ) {
            // console.log("test");
            // console.log(this._countdown.nativeElement);
            this._countdown.nativeElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }

    }

    ngOnDestroy(): void {
        this.metaviewport.content = 'width=device-width, initial-scale=1.0';
        // this.orientationChange$.unsubscribe();
        this.testChange$.unsubscribe();
        this.exerciseChange$.unsubscribe();
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
    
    private openLongMemoryWellcomeDialog(): MatDialogRef<LongMemoryWellcomeDialogComponent, any> {
        const config = new MatDialogConfig();
        config.panelClass = ["custom-rulit-dialog"];
        config.maxWidth = "30rem";
        config.data = { 
            userName: this.userService.user.name,
            message: "Hace un tiempo descubriste la ruta para atravesar este laberinto. Trata de recordarla debemos salir de aquí una vez más. Igual que antes te indicaremos si vas por el camino correcto."
        }
        return this._dialog.open(LongMemoryWellcomeDialogComponent, config);
    }

    private openNotConnectedNodeDialog() {
        const config = new MatDialogConfig();
        config.panelClass = ["custom-rulit-dialog"];
        this._dialog.open(NotConnectedNodeDialogComponent,config);
    }

    // 
    private openFinishTestDialog(theTitle: string, theMessage: string): MatDialogRef<FinishTestDialogComponent, any> {
        const config = new MatDialogConfig();
        config.data = { title: theTitle, message: theMessage };
        config.panelClass = ["custom-rulit-dialog"];
        config.disableClose = true;
        return this._dialog.open(FinishTestDialogComponent,config);
    }

}

