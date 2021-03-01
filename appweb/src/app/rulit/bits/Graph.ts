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
    nodes: Array<Vertex>,
    adjList: Map<Vertex,Array<number>>,
    currentNode: Vertex,
    currentNode$: Observable<Vertex>,
    firstNode: Vertex,
    addVertex(theVertex: Vertex, edges: Array<number>): void | boolean,
    isCurrentNodeNextTo(theNode: Vertex): boolean,
    getNodeById(theNodeId: number): Vertex | undefined
}


export class Graph implements IGraph {
    
    private _adjList: Map<Vertex,Array<number>>;
    private _currentNode: Vertex;
    private currentNodeChange$ = new Subject<Vertex>();
    
    constructor(){
        this._adjList = new Map<Vertex,Array<number>>();

        this.currentNode$.subscribe( (theNode) => { this._currentNode = theNode } );
    }

    addVertex(theVertex: Vertex, edges: Array<number>) {
        this._adjList.set(theVertex,edges);
    }

    // Returns all nodes in an array
    get nodes(): Array<Vertex> {
        return Array.from(this._adjList.keys());
    }

    // Returns the comple adjacency list
    get adjList(): Map<Vertex,Array<number>>{
        return this._adjList;
    }

    // Return the current active node
    get currentNode(): Vertex {
        return this._currentNode;
    }

    //
    get currentNode$(){
        return this.currentNodeChange$.asObservable();
    }

    // Set the current active node
    set currentNode( theNode: Vertex ) {
        // Set active flag to false for all nodes
        this.nodes.map( node => node.id == theNode.id ? node.isActive = true : node.isActive = false);
        // Set current node
        this.currentNodeChange$.next(theNode);
    }

    get firstNode(): Vertex{
        let node: Vertex;
        this.nodes.forEach( n => {
            if (n.isFirstNode) node = n;
        })
        return node;
    };

    // Searchs for a node using an id as key
    getNodeById(theNodeId: number): Vertex | undefined {
        return this.nodes.find( node => theNodeId == node.id );
    }

    isCurrentNodeNextTo(theNode: Vertex): boolean {
        return this._adjList.get(this._currentNode).includes(theNode.id);
    }

}
