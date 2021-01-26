import { Vertex } from './Vertex';

interface IGraph{
    nodes: Array<Vertex>,
    getNodeById(theId: number): Vertex,
    addVertex(theVertex: Vertex): void | boolean,
    draw(): void
}

export class Graph implements IGraph{
    
    private _nodes: Array<Vertex>;
    private _adjList: Map<Number,Array<Number>>;

    constructor( private _context: CanvasRenderingContext2D ){
        this._nodes = new Array<Vertex>();
        this._adjList = new Map<Number,Array<Number>>();
    }

    addVertex(theVertex: Vertex) {
        // If the vertex already exists, do nothing.
        if (this._nodes.find(v => v.id === theVertex.id)) {
            return true;
        }

        this._nodes.push(theVertex);
    }

    addEdge(idV1: number, idV2: number){
        // if ( this._adjList.)
    }

    get nodes(){
        return this._nodes;
    }

    getNodeById(theId: number): Vertex{
        return this._nodes.find( node => node.id == theId );
    }

    // private belongsToGraph(vertex: Vertex){

    // }

    draw() {
        this._nodes.forEach(node => node.circle.draw());
    }

}
