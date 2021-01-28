import { Vertex } from './Vertex';

interface IGraph{
    nodes: Array<Vertex>
    addVertex(theVertex: Vertex, edges: Array<number>): void | boolean
    findNode(theNodeId: number): Vertex
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

    // Draws edges first and then the nodes
    draw() {
        for (const [theNode, edges] of this._adjList.entries()) {
            edges.forEach( connectedNodeId => {
                let connectedNode = this.findNode(connectedNodeId);
                theNode.drawEdgeTo(connectedNode);
            });
        }
        this.nodes.forEach(node => node.circle.draw());
    }

    // Searchs for a node using an id as key
    findNode(theNodeId: number): Vertex {
        return this.nodes.find( node => theNodeId == node.id );
    }

}
