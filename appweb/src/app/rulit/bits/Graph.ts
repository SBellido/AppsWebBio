import { Vertex } from './Vertex';

interface IGraph{
    nodes: Array<Vertex>
    addVertex(theVertex: Vertex, edges: Array<number>): void | boolean
    draw(): void
}

export class Graph implements IGraph{
    
    private _adjList: Map<Vertex,Array<Number>>;

    constructor( private _context: CanvasRenderingContext2D ){
        this._adjList = new Map<Vertex,Array<Number>>();
    }

    addVertex(theVertex: Vertex, edges: Array<number>) {
        this._adjList.set(theVertex,edges);
    }

    get nodes(){
        return Array.from(this._adjList.keys());
    }

    draw() {
        this.nodes.forEach(node => node.circle.draw());
    }

}
