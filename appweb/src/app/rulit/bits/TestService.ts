import { Injectable } from "@angular/core";
import { Graph } from "./Graph";



@Injectable()
export class TestService {

    private _graph: Graph;

    constructor(){}

    get graph(): Graph{
        return this._graph;
    }

    set graph(theGraph: Graph){
        this._graph = theGraph;
    }

    handleNewMove(clientX: number, clientY: number ): void {
        
        let node = this._graph.getNodeAtPosition(clientX,clientY);

        if (node){
            this._graph.currentNode = node;
            this._graph.draw();
        }

    }

}