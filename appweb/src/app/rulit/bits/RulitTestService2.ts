import { ElementRef, Injectable } from "@angular/core";
import { CanvasGraph } from "./CanvasGraph";
import { buildGraph, DEFAULT_GRAPH_SOLUTION, getGraphAndSolutionFromId } from "./GraphUtils";

interface IRulitTestService2 {
    graphAndSolutionId: string,
    isTesting: boolean,
    graph: CanvasGraph,
    initGraph(canvas: ElementRef<HTMLCanvasElement>): Promise<void>;
}

@Injectable({
    providedIn: 'root'
})
export class RulitTestService2 implements IRulitTestService2 {
    
    isTesting: boolean;
    graph: CanvasGraph;

    private _graphAndSolutionId: string;
    private _solution: Array<number>;

    constructor() {
        this.isTesting = false;
    }
   
    get graphAndSolutionId(): string {
        return this._graphAndSolutionId;
    }
    
    set graphAndSolutionId(theGraphAndSolutionId: string | null) {
        if (theGraphAndSolutionId)
            this._graphAndSolutionId = theGraphAndSolutionId;
        else
            this._graphAndSolutionId = DEFAULT_GRAPH_SOLUTION;
    }

    async initGraph(canvas: ElementRef<HTMLCanvasElement>): Promise<void> {
        if (! this._graphAndSolutionId ) this.graphAndSolutionId = null;
        const {graphData,solutionData} = getGraphAndSolutionFromId(this._graphAndSolutionId);
        this.graph = await buildGraph(graphData,canvas);
        this._solution = solutionData;
    }

}
