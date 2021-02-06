import { ElementRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vertex } from './Vertex';

// Coordinates types for a 13 rows x 18 columns grid
type GraphRowNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 ;
type GraphColumnNumber =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;

// Graph nodes fields
export interface IGraphNode {
    id: number,
    isFirstNode: boolean,
    isLastNode: boolean,
    edges: Array<number>,
    row: GraphRowNumber,
    column: GraphColumnNumber
}

// Graph
interface IGraph {
    nodes: Array<Vertex>
    currentNode: Vertex
    currentNode$: Observable<Vertex>
    addVertex(theVertex: Vertex, edges: Array<number>): void | boolean
    getNodeById(theNodeId: number): Vertex | undefined
    getNodeAtPosition(clientX: number,clientY: number ): Vertex | undefined
    draw(): void
}

@Injectable()
export class Graph implements IGraph{
    
    private _adjList: Map<Vertex,Array<number>>;
    private _currentNode: Vertex;
    private currentNodeChange$ = new Subject<Vertex>();
    public currentNode$ = this.currentNodeChange$.asObservable();
    
    private _canvas: ElementRef<HTMLCanvasElement>;
    private _context: CanvasRenderingContext2D;

    constructor(){
        this._adjList = new Map<Vertex,Array<number>>();
    }

    set canvas(theCanvas: ElementRef<HTMLCanvasElement>){
        this._canvas = theCanvas;
        this._context = this._canvas.nativeElement.getContext("2d");
    }

    addVertex(theVertex: Vertex, edges: Array<number>) {
        this._adjList.set(theVertex,edges);
    }

    // Returns all nodes in an array
    get nodes(): Array<Vertex> {
        return Array.from(this._adjList.keys());
    }

    // Return the current active node
    get currentNode(): Vertex {
        return this._currentNode;
    }

    // Set the current active node
    set currentNode( theNode: Vertex ) {
        // Set active flag to false for all nodes
        this.nodes.map( node => node.id == theNode.id ? node.isActive = true : node.isActive = false);
        // Set current node
        this._currentNode = theNode;
        //
        this.currentNodeChange$.next();
    }

    // Draws edges first and then nodes
    draw() {

        // Clear canvas
        let canvasRect = this._canvas.nativeElement.getBoundingClientRect();
        this._context.clearRect(0, 0, canvasRect.width, canvasRect.height);

        // Draw edges of each node
        for (const [theNode, edges] of this._adjList.entries()) {
            edges.forEach( connectedNodeId => {
                let connectedNode = this.getNodeById(connectedNodeId);
                this.drawEdgeBetweenNodes(theNode,connectedNode);
            });
        }

        // Draw nodes
        this.nodes.forEach(node => node.circle.draw(this._context));
    }
    
    private drawEdgeBetweenNodes(theNode: Vertex, connectedNode: Vertex) {
        this._context.beginPath();
        this._context.moveTo(theNode.circle.posX, theNode.circle.posY);
        this._context.lineTo(connectedNode.circle.posX,connectedNode.circle.posY);
        this._context.stroke();
        this._context.closePath();
        this._context.restore();
    }

    // Searchs for a node using an id as key
    getNodeById(theNodeId: number): Vertex | undefined {
        return this.nodes.find( node => theNodeId == node.id );
    }

    // Searchs canvas for a node using event absolute coordinates
    getNodeAtPosition( clientX: number, clientY: number ): Vertex | undefined {
        
        let canvasRect = this._canvas.nativeElement.getBoundingClientRect();

        let thePosition = {
            x: clientX - canvasRect.left,
            y: clientY - canvasRect.top
        }

        let theNode: Vertex;

        this.nodes.forEach( node => {
            if ( node.circle.isPointInside(thePosition) ) {
                theNode = node;
            }
        });

        return theNode ? theNode : undefined;

    }

}
