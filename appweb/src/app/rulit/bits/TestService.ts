import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
        
        let node = this._graph.getNodeAtPosition(thePosition);
        this._graph.currentNode = node;
        this.drawGraph();

    }

}