import { ElementRef, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { CanvasGraph } from "./CanvasGraph";
import { ExerciseService } from "./ExerciseService";
import { GraphNode } from "./GraphNode";
import { buildGraph, DEFAULT_GRAPH_SOLUTION, getGraphAndSolutionData } from "./GraphUtils";
import { IRulitExercise, IRulitUser, RulitUserService } from "./RulitUserService";

export type TestName = "learning" | "short_memory_test" | "long_memory_test" | "no_next_test";

interface IRulitTestService {
    testName: TestName,
    graphAndSolutionId: string,
    isTesting: boolean,
    isExerciseOver$: Observable<boolean>,
    isTestOver$: Observable<string | null>,
    initGraph(canvas: ElementRef<HTMLCanvasElement>): Promise<void>,
    startTest(userService: RulitUserService): void,
    isNodeNextInSolution(theNode: GraphNode): boolean,
    setActiveNode(theNode): void,
    registerError(user: IRulitUser),
    getCurrentTestExercisesArray(userService: RulitUserService): Array<IRulitExercise>
}

@Injectable({
    providedIn: 'root'
})
export class RulitTestService implements IRulitTestService {
    
    isTesting: boolean;
    graph: CanvasGraph;
    testName: TestName;

    private _graphAndSolutionId: string = DEFAULT_GRAPH_SOLUTION;
    private _solution: Array<number>;
    private _currentExercise: ExerciseService;
    private _activeNodeChange$: Observable<GraphNode>;
    private _isExerciseOver$: Subject<boolean>;
    private _isTestOver$: Subject<string | null>;

    constructor() {
        this.isTesting = false;
        this._isExerciseOver$ = new Subject<boolean>();
        this._isTestOver$ = new Subject<string | null>();
    }
   
    get graphAndSolutionId(): string {
        return this._graphAndSolutionId;
    }
    
    set graphAndSolutionId(theGraphAndSolutionId: string) {
        this._graphAndSolutionId = theGraphAndSolutionId;
    }

    get isExerciseOver$(): Observable<boolean>{
        return this._isExerciseOver$.asObservable();
    }
    
    get isTestOver$(): Observable<string | null>{
        return this._isTestOver$.asObservable();
    }

    async initGraph(canvas: ElementRef<HTMLCanvasElement>): Promise<void> {
        const {graphData,solutionData} = getGraphAndSolutionData(this._graphAndSolutionId);
        this.graph = await buildGraph(graphData,canvas);
        this._solution = solutionData.reverse();
    }

    startTest(userService: RulitUserService): void {
        
        this.testName = userService.user.nextTest;
        this._currentExercise = new ExerciseService();

        // 
        this._activeNodeChange$ = this.graph.activeNode$;
        this._activeNodeChange$
            .pipe(
                filter( (theNode) => theNode.isLastNode ),
                map( () => { return this.getCurrentTestExercisesArray(userService) }),
                tap( (currentTestExercisesArray) => { this.saveCurrentExercise(currentTestExercisesArray) } ),
            )
            .subscribe({ 
                next: (currentTestExercisesArray: Array<IRulitExercise>) => {
                    console.log("test");
                    const testOver = this.isTestOver(userService, currentTestExercisesArray);
                    if (testOver) {
                        this._isTestOver$.next(testOver);
                    }
                    else
                    {
                        this._isExerciseOver$.next(true);
                    }
                } 
            }
        );

        this.isTesting = true;
    }
    
    private saveCurrentExercise(currentTestExercisesArray: Array<IRulitExercise>): void {
        currentTestExercisesArray.push(this._currentExercise.toDataExercise());
    }

    getCurrentTestExercisesArray(userService: RulitUserService): Array<IRulitExercise> {
        
        let currentTestExercisesArray: Array<IRulitExercise>;
        
        if ( this.testName == "learning" || this.testName == "short_memory_test" ) {
            currentTestExercisesArray = userService.user.shortMemoryTest;
        }
        else if ( this.testName == "long_memory_test" ) {
            currentTestExercisesArray = userService.user.longMemoryTest;
        }

        return currentTestExercisesArray;

    }

    private isTestOver(userService: RulitUserService, currentTestExercisesArray: Array<IRulitExercise>): string | null {
        
        const MAX_EXERCISES: number = userService.getMaxExercices(this.testName);
        const MAX_CORRECT_EXERCISES: number = userService.getMaxCorrectExercices(this.testName);
        
        const correctExercisesInTest = userService.getConsecutiveCorrectExercises(this.testName);
        
        if ( correctExercisesInTest >= MAX_CORRECT_EXERCISES ) {
            return "MAX_CORRECT_EXERCISES";
        }
        if ( currentTestExercisesArray.length == MAX_EXERCISES ) {
            return "MAX_EXERCISES";
        }

        return null;

    }

    isNodeNextInSolution(theNode: GraphNode): boolean {
        // Compare the node to the last element in the array
        return this._solution[this._solution.length - 1] == theNode.id;
    }

    setActiveNode(theNode: GraphNode): void {
        if ( this._currentExercise.currentStep )
            this._currentExercise.completeCurrentStep();
        
        this._solution.pop();
        this._currentExercise.initNewStep();
        this.graph.activeNode = theNode;
    }

    registerError(user: IRulitUser) {
        this._currentExercise.addIncorrectMove();
        const stepIndex = this._currentExercise.steps.length;
        user.stepErrors[stepIndex] += 1;
    }

}
