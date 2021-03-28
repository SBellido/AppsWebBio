import { ElementRef, Injectable } from "@angular/core";
import { CanvasGraph } from "./CanvasGraph";
import { ExerciseService } from "./ExerciseService";
import { GraphNode } from "./GraphNode";
import { buildGraph, DEFAULT_GRAPH_SOLUTION, getGraphAndSolutionData } from "./GraphUtils";

export type TestName = "learning" | "short_memory_test" | "long_memory_test" | "no_next_test";

interface IRulitTestService {
    graphAndSolutionId: string,
    isTesting: boolean,
    initGraph(canvas: ElementRef<HTMLCanvasElement>): Promise<void>,
    startTest(): void,
    isNodeNextInSolution(theNode: GraphNode): boolean,
    setActiveNode(theNode): void
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

    constructor() {
        this.isTesting = false;
    }
   
    get graphAndSolutionId(): string {
        return this._graphAndSolutionId;
    }
    
    set graphAndSolutionId(theGraphAndSolutionId: string) {
        this._graphAndSolutionId = theGraphAndSolutionId;
    }

    async initGraph(canvas: ElementRef<HTMLCanvasElement>): Promise<void> {
        const {graphData,solutionData} = getGraphAndSolutionData(this._graphAndSolutionId);
        this.graph = await buildGraph(graphData,canvas);
        this._solution = solutionData.reverse();
    }

    startTest(): void {
        this._currentExercise = new ExerciseService();
        this.isTesting = true;
    }

    isNodeNextInSolution(theNode: GraphNode): boolean {
        // console.log("checking if node " + theNode.id + " is next");
        // console.log(this._solution);
        // console.log(this._solution[this._solution.length - 1] == theNode.id);
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

}
