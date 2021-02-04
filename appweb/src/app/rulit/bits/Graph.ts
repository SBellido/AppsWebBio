import { Vertex } from './Vertex';

// Coordinates types for a 13 rows x 18 columns grid
type GraphRowNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 ;
type GraphColumnNumber =  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;

// Graphs nodes fields
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
    addVertex(theVertex: Vertex, edges: Array<number>): void | boolean
    getNodeById(theNodeId: number): Vertex | undefined
    getNodeAtPosition(thePosition: { x: number, y: number} ): number | undefined
    draw(): void
}

export class Graph implements IGraph{
    
    private _adjList: Map<Vertex,Array<number>>;
    private _currentNode: Vertex;

    constructor( private _context: CanvasRenderingContext2D ){
        this._adjList = new Map<Vertex,Array<number>>();
    }

    addVertex(theVertex: Vertex, edges: Array<number>) {
        this._adjList.set(theVertex,edges);
    }

    // Returns all nodes in an array
    get nodes(){
        return Array.from(this._adjList.keys());
    }

    // Return the current active node
    get currentNode(){
        return this._currentNode;
    }

    set currentNode( theNode: Vertex ){
        // Set active to false for all nodes
        this.nodes.map( node => node.active = false);
        // Set current node
        this._currentNode = theNode;
    }

    // Draws edges first and then nodes
    draw() {
        for (const [theNode, edges] of this._adjList.entries()) {
            edges.forEach( connectedNodeId => {
                let connectedNode = this.getNodeById(connectedNodeId);
                theNode.drawEdgeTo(connectedNode);
            });
        }
        this.nodes.forEach(node => node.circle.draw());
    }

    // Searchs for a node using an id as key
    getNodeById(theNodeId: number): Vertex | undefined {
        return this.nodes.find( node => theNodeId == node.id );
    }

    // Searchs for a node using a point as key
    getNodeAtPosition(thePosition: { x: number, y: number} ): number | undefined{
        
        let theNode: number;

        this.nodes.forEach( node => {
            if ( node.circle.isPointInside(thePosition) ) {
                theNode = node.id;
            }
        });

        return theNode ? theNode : undefined;

    }

}
