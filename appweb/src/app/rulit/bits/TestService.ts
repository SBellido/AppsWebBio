import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Graph } from "./Graph";
import { Vertex } from "./Vertex";


@Injectable()
export class TestService {

    // Test Service depends on:
    //      - Graph
    //      - User
    constructor(private graph: Graph){}

    get graphCurrentNode$(): Observable<Vertex>{
        return this.graph.currentNode$;
    }

    // Handles user move:
    //      - Searchs for a node in clicked area. (Done)
    //      - Validates that the node is conected with previous one.
    //          . when not "display a error message for 5 - 7 sec."
    //      - Checks if the move is part of the solution.
    //          . when not "display selected node in red for X sec."
    //      - Add valid move to users current test
    //      - Update current active node in graph. (Done)
    handleNewMove(clientX: number, clientY: number ): void {
        
        let newNode = this.graph.getNodeAtPosition(clientX,clientY);

        if (newNode){
            if ( ! this.graph.currentNode ) {
                newNode.isFirstNode ? this.graph.currentNode = newNode 
                    : console.log("Must click first node"); // TBC
            } else {
                this.graph.isCurrentNodeConnectedTo(newNode) ? this.graph.currentNode = newNode 
                    : console.log("New node isnt connected"); // TBC
            }
        }

    }

    drawGraph(): void {
        this.graph.draw();
    }

}
