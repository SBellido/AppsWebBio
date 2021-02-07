import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Graph } from "./Graph";
import { Vertex } from "./Vertex";


@Injectable()
export class TestService {

    // Test Service depends on:
    //      - Graph
    //      - Solution
    //      - User
    constructor(private graph: Graph, private SOLUTION: Array<number>){
        // Reverse solutions array to be used as a stack
        this.SOLUTION.reverse();
    }

    get graphCurrentNode$(): Observable<Vertex>{
        return this.graph.currentNode$;
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

        if ( newNode ) {
            if ( ! this.graph.currentNode ) {
                newNode.isFirstNode ? this.graph.currentNode = newNode 
                    : console.log("First move must be start node"); // TBC
            } else {
                if ( this.graph.isCurrentNodeConnectedTo(newNode) ) {
                    if ( this.isSelectedNodeNextInSolution(newNode) ){
                        this.graph.currentNode = newNode;
                    } else {
                        console.log("Selected node flickers in red");
                    }
                } else {
                    console.log("Selected node isnt connected"); // TBC "display a error message for 5 - 7 sec."
                }
            }
        }

    }
    
    private isSelectedNodeNextInSolution(theNode: Vertex): boolean {
        // Compare the node to the last element in the array
        return this.SOLUTION[this.SOLUTION.length - 1] == theNode.id;
    }

    markAsVisited (theNode: Vertex) {
        this.SOLUTION.pop();
    }

    drawGraph(): void {
        this.graph.draw();
    }

}
