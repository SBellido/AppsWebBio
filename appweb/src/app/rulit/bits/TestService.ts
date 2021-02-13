import { NgZone } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CanvasGraph } from "./CanvasGraph";
import { ExerciseService, IRulitTestExercise } from "./ExerciseService";
import { RulitUserService, IRulitExercise, IRulitStep } from "./RulitUserService";
import { Vertex } from "./Vertex";

export type TestName = "learning" | "short_memory_test" | "long_memory_test";


export class TestService {

    private testName: TestName;
    
    private currentExercise: IRulitTestExercise;
    private isExerciseOver$ = new Subject<boolean>();
    
    private newNode: Vertex;
    private newNodeChange$ = new Subject<Vertex>();    

    // Test Service depends on:
    //      - Graph
    //      - Solution
    //      - NgZone of the component
    //      - User
    constructor(
        public graph: CanvasGraph, 
        private solution: Array<number>, 
        private ngZone: NgZone,
        private userService: RulitUserService) {

        // Set current test name
        this.testName = this.userService.user.nextTest;

        //
        this.currentExercise = new ExerciseService();

        // Reverse solutions array to be used as a stack
        this.solution.reverse();

        // Observe when current node changes in order to remove the last element in solutions array.
        this.graph.currentNode$.subscribe( () => { 
            this.solution.pop();
            // TODO: Observe to finish the test or exercise
        });

        // When theres a clicked node
        this.newNode$.subscribe({ 
            next: (newNode) => { 
                // If is the first move in the exercise
                if ( newNode.isFirstNode && ! this.currentExercise.currentStep ) {
                    this.currentExercise.initNewStep();
                    this.graph.currentNode = newNode;
                } else {
                    if ( this.graph.isCurrentNodeNextTo(newNode) ) {
                        if ( this.isSelectedNodeNextInsolution(newNode) ) {
                            // Update exercise by completing current step
                            this.currentExercise.completeCurrentStep();
                            
                            // Update current node in the graph
                            this.graph.currentNode = newNode;

                            // Build a new step
                            this.currentExercise.initNewStep();
                        } else {
                            // Update step and exercise variables
                            this.currentExercise.addIncorrectMove();

                            // Selected node flickers in red
                            this.ngZone.runOutsideAngular( () => { this.graph.flickerNode(newNode); } );
                        }
                    } else {
                        this.currentExercise.addIncorrectMove();
                        console.log("Selected node isnt connected"); // TODO "display a error message for 5 - 7 sec."
                    }
                }
                
            } });

    }

    // private get currentStep(): IRulitTestStep {
    //     return this.currentExercise.currentStep;
    // }
    
    // private set currentStep( theStep: IRulitTestStep ) {
    //     this.currentExercise.currentStep = theStep;
    // }

    get exerciseChange$(): Observable<boolean> {
        return this.isExerciseOver$.asObservable();
    }

    private get newNode$(): Observable<Vertex> {
        return this.newNodeChange$.asObservable();
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
        if ( newNode ) this.newNodeChange$.next(newNode);
            
            // Is the first move in the exercise
            // if ( ! this.graph.currentNode ) {
                
                // Clicked node is first node
                // if ( newNode.isFirstNode ) {
                    // this.currentStep = this.buildNewStep();
                    // this.graph.currentNode = newNode;
                // } else {
                    // console.log("First move must be start node"); // TBC
                // }

            // } else { // Having a clicked node other than the firstone
                
            //     if ( this.graph.isCurrentNodeNextTo(newNode) ) {
            //         if ( this.isSelectedNodeNextInsolution(newNode) ) {
                        
                        // Update current step variables
                        // let currentTimeInMilliseconds = new Date().getTime();
                        // this.currentStep.timeEnlapsed = new Date(currentTimeInMilliseconds - this.currentStep.initialTime).getMilliseconds();
                        // this.currentStep.correctMoves++;
                        // 
                        // this.currentExercise.steps.push(this.currentStep.toDataStep(this.currentStep));
                        
                        // Update current node
                        // this.graph.currentNode = newNode;

                        // this.currentStep = this.buildNewStep();
                        
                    // } else {
                        // Update current step variables
                        // this.currentStep.incorrectMoves++;

                        // Selected node flickers in red
                        // this.ngZone.runOutsideAngular( () => { this.graph.flickerNode(newNode); } );
                    // }
                // } else {
                    // Sums a incorrect decision to this step
                    // this.currentStep.incorrectMoves++;
                    // console.log("Selected node isnt connected"); // TODO "display a error message for 5 - 7 sec."
                // }

                // if ( this.currentTestName == "learning" && this.graph.currentNode.isLastNode ) {
                //     this.userService.user.nextTest = "short_memory_test";
                //     this.userService.user.test1.push(this.currentExercise.toDataExercise(this.currentExercise));
                //     this.isExerciseOver$.next(true);
                //     console.log(this.userService.user);
                //     console.log("lerning test is over");
                // }

                // if ( this.currentTestName == "short_memory_test" && this.graph.currentNode.isLastNode ) {
                    // TODO: check if this is the second win
                //     this.userService.user.test1.push(this.currentExercise.toDataExercise(this.currentExercise));
                //     this.isExerciseOver$.next(true);
                //     console.log(this.userService.user);
                //     console.log("lerning test is over");
                // }



            // }

    }
    
    private isSelectedNodeNextInsolution(theNode: Vertex): boolean {
        // Compare the node to the last element in the array
        return this.solution[this.solution.length - 1] == theNode.id;
    }

}
