import { Injectable } from "@angular/core";
import { Graph, IGraphNode } from "./Graph";
import { GraphService } from "./GraphService";



@Injectable()
export class TestService {

    private _graph: Graph;

    constructor (private graphService: GraphService){}

    buildGraph(graphData: Array<IGraphNode>, theContext: CanvasRenderingContext2D): void {
        this._graph = this.graphService.buildGraph(graphData,theContext);
    }

    drawGraph(): void{
        this._graph.draw();
    }

    handleNewMove(thePosition: { x: number, y: number }): void {
        console.log( this._graph.getNodeAtPosition(thePosition) );
    }

}