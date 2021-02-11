import { NgZone } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CanvasGraph } from "./CanvasGraph";
import { RulitUserService, IRulitExercise, IRulitStep } from "./RulitUserService";
import { Vertex } from "./Vertex";

interface IRulitTestStep extends IRulitStep {
    initialTime: number,
    toDataStep(testStep: IRulitTestStep): IRulitStep
}

interface IRulitTestExercise extends IRulitExercise {
    currentStep: IRulitTestStep,
    toDataExercise(testExercise: IRulitTestExercise): IRulitExercise
}

export class TestService {

    private currentExercise: IRulitTestExercise;
    // private isExerciseOver: boolean;
    private isExerciseOver$: Subject<boolean> = new Subject<boolean>();
    exerciseChange$: Observable<boolean> = this.isExerciseOver$.asObservable();
    

    // Test Service depends on:
    //      - Graph
    //      - Solution
    //      - NgZone of the component
    //      - User
    constructor(
        private graph: CanvasGraph, 
        private solution: Array<number>, 
        private ngZone: NgZone,
        private userService: RulitUserService) {

        // Reverse solutions array to be used as a stack
        this.solution.reverse();

        // Observe when current node changes in order to remove the last element in solutions.
        this.graph.currentNode$.subscribe( () => { 
            this.solution.pop();
        });
        
        this.currentExercise = this.buildNewExercise();

    }

    // Expose changes in current node.
    get graphCurrentNode$(): Observable<Vertex>{
        return this.graph.currentNode$;
    }

    private get currentStep(): IRulitTestStep {
        return this.currentExercise.currentStep;
    }
    
    private set currentStep( theStep: IRulitTestStep ) {
        this.currentExercise.currentStep = theStep;
    }

    // Handles user move:
    //      - Searchs for a node in clicked area. (Done)
    //      - Validates that the node is conected with previous one.
    //          . when not "display a error message for 5 - 7 sec."
    //      - Checks if the move is part of the solution.
    //          . when not "selected node flickers in red for X sec."
    //      - Add valid move to users current test
    //      - Update current active node in graph. (Done)
    handleNewMove(clientX: number, clientY: number ): void {
        
        let newNode = this.graph.getNodeAtPosition(clientX,clientY);

        // Theres a node clicked
        if ( newNode ) {
            // Is the first move in the exercise
            if ( ! this.graph.currentNode ) {
                // Clicked node is first node
                if ( newNode.isFirstNode ) {
                    this.currentStep = this.buildNewStep();
                    this.graph.currentNode = newNode;
                } else {
                    console.log("First move must be start node"); // TBC
                }
            } else {
                if ( this.graph.isCurrentNodeConnectedTo(newNode) ) {
                    if ( this.isSelectedNodeNextInsolution(newNode) ) {
                        
                        // Update current step variables
                        let currentTimeInMilliseconds = new Date().getTime();
                        this.currentStep.timeEnlapsed = new Date(currentTimeInMilliseconds - this.currentStep.initialTime).getMilliseconds();
                        this.currentStep.correctMoves++;
                        // 
                        this.currentExercise.steps.push(this.currentStep.toDataStep(this.currentStep));
                        
                        // Update current node
                        this.graph.currentNode = newNode;

                        // Check if exercise is over
                        if ( newNode.isLastNode ) {
                            if ( this.isTestOver() ) { 
                                console.log("test is over");
                            } else {
                                
                                // TODO add total for the exercise
                                // for (const [] of this.currentExercise.steps) {
                                    
                                // }

                                this.isExerciseOver$.next(true);
                                console.log("exercise is over");
                                console.log(this.currentExercise);
                            }
                        } else {
                            this.currentStep = this.buildNewStep();
                        }
                        
                    } else {
                        // Update current step variables
                        this.currentStep.incorrectMoves++;

                        // Selected node flickers in red
                        this.ngZone.runOutsideAngular( () => { this.graph.flickerNode(newNode); } );
                    }
                } else {
                    // Update current step variables
                    this.currentStep.incorrectMoves++;
                    // TBC: sums a incorrect decision
                    console.log("Selected node isnt connected"); // TODO "display a error message for 5 - 7 sec."
                }
            }

        }

    }
    
    private isSelectedNodeNextInsolution(theNode: Vertex): boolean {
        // Compare the node to the last element in the array
        return this.solution[this.solution.length - 1] == theNode.id;
    }

    drawGraph(): void {
        this.graph.draw();
    }

    private buildNewStep = (): IRulitTestStep  => {
        
        let currentTimeInMilliseconds = new Date().getTime();
        
        return {
            initialTime: currentTimeInMilliseconds,
            timeEnlapsed: 0,
            correctMoves: 0,
            incorrectMoves: 0,
            toDataStep: function( testStep: IRulitTestStep ): IRulitStep {
                return {
                    timeEnlapsed: testStep.timeEnlapsed,
                    correctMoves: testStep.correctMoves,
                    incorrectMoves: testStep.incorrectMoves
                }
            }
        };
    }
    
    private buildNewExercise = (): IRulitTestExercise  => {
        return {
            totalCorrectMoves: 0,
            totalIncorrectMoves: 0,
            totalExerciseTime: 0,
            steps: new Array<IRulitStep>(),
            currentStep: null,
            toDataExercise: function( testExercise: IRulitTestExercise ): IRulitExercise {
                return {
                    totalCorrectMoves: testExercise.totalCorrectMoves,
                    totalIncorrectMoves: testExercise.totalIncorrectMoves,
                    totalExerciseTime: testExercise.totalExerciseTime,
                    steps : testExercise.steps
                }
            }
        };
    }

    private isTestOver(): boolean {
        return false;
    }

}
