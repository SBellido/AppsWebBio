import { NgZone } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { CanvasGraph } from "./CanvasGraph";
import { ExerciseService, IRulitTestExercise } from "./ExerciseService";
import { IRulitExercise, RulitUserService } from "./RulitUserService";
import { Vertex } from "./Vertex";

export type TestName = "learning" | "short_memory_test" | "long_memory_test" | "no_next_test";

const MAX_EXERCISES = 10;

export class TestService {

    private testName: TestName;
    
    private currentExercise: IRulitTestExercise;
    private isExerciseOver$ = new Subject<boolean>();
    private isTestOver$ = new Subject<boolean>();
    
    // private newNode: Vertex;
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
        this.graph.currentNode$.subscribe( (theNode) => { 
            
            this.solution.pop();
            
            // When the node is the last in graph: 
            //      - Check if test has finished
            //      - or, go to the next exercise.
            if ( theNode.isLastNode ) {

                let currentExercisesArray: Array<IRulitExercise>;

                if ( this.testName == "learning" || this.testName == "short_memory_test" ) currentExercisesArray = this.userService.user.test1;
                if ( this.testName == "long_memory_test" ) currentExercisesArray = this.userService.user.test2;
                
                currentExercisesArray.push(this.currentExercise.toDataExercise());
                
                if ( this.userService.haveFinishedTheTest( currentExercisesArray , MAX_EXERCISES ) ) { 
                    
                    if ( this.testName == "short_memory_test" ) {
                        this.userService.user.nextTest = "long_memory_test";
                        this.isTestOver$.next(true);
                        console.log("Short memory test is over");
                    }
                    
                    if ( this.testName == "long_memory_test" ) {
                        this.userService.user.nextTest = "no_next_test";
                        this.isTestOver$.next(true);
                        console.log("Long memory test is over"); 
                    }

                } else {

                    this.isExerciseOver$.next(true); 

                    if ( this.testName == "learning" ) { 
                        this.userService.user.nextTest = "short_memory_test";
                        console.log("Lerning exercise is over"); 
                    }

                }

                console.log(this.userService.user);

            }

        });

        // When theres a new clicked node
        this.newNode$.subscribe({ 
            next: (newNode) => { 
                // Can be the first move in the exercise
                if ( ! this.currentExercise.currentStep ) {
                    if ( newNode.isFirstNode ) {
                        this.currentExercise.initNewStep();
                        this.graph.currentNode = newNode;
                    } else {
                        console.log("Must start form initial node"); // TODO 
                    }
                }
                if ( this.currentExercise.currentStep && ! newNode.isFirstNode ) {

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
            }
        });

    }

    get exerciseChange$(): Observable<boolean> {
        return this.isExerciseOver$.asObservable();
    }
    
    get testChange$(): Observable<boolean> {
        return this.isTestOver$.asObservable();
    }

    private get newNode$(): Observable<Vertex> {
        return this.newNodeChange$.asObservable();
    }

    // Handles user move:
    //      - Searchs for a node in clicked area.
    //      - Emits the new node change.
    handleNewMove(clientX: number, clientY: number ): void {
        
        let newNode = this.graph.getNodeAtPosition(clientX,clientY);

        // Theres a node clicked
        if ( newNode ) this.newNodeChange$.next(newNode);

    }
    
    private isSelectedNodeNextInsolution(theNode: Vertex): boolean {
        // Compare the node to the last element in the array
        return this.solution[this.solution.length - 1] == theNode.id;
    }

}
