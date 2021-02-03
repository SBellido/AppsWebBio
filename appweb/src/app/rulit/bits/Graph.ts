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
    addVertex(theVertex: Vertex, edges: Array<number>): void | boolean
    searchNodeById(theNodeId: number): Vertex | undefined
    draw(): void
}

export class Graph implements IGraph{
    
    private _adjList: Map<Vertex,Array<number>>;

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

    // Draws edges first and then nodes
    draw() {
        for (const [theNode, edges] of this._adjList.entries()) {
            edges.forEach( connectedNodeId => {
                let connectedNode = this.searchNodeById(connectedNodeId);
                theNode.drawEdgeTo(connectedNode);
            });
        }
        this.nodes.forEach(node => node.circle.draw());
    }

    // Searchs for a node using an id as key
    searchNodeById(theNodeId: number): Vertex | undefined {
        return this.nodes.find( node => theNodeId == node.id );
    }

    // Searchs for a node using a point as key
    // searchNodeInPosition(thePosition: { x: number, y: number} ): number | undefined {
        
    //     this.nodes.forEach( node => {
    //         if ( node.circle.isPointInside(thePosition) ) {
    //             console.log(node.id);
    //             return node.id;
    //         }
    //     });
    //     return undefined;
    // }

}
