import { Vertex } from './Vertex';

export class Graph {
    
    private _nodes: Array<Vertex>;
    private _adjList: Map<Number,Array<Number>>;

    constructor(){
        this._nodes = new Array<Vertex>();
        this._adjList = new Map<Number,Array<Number>>();
    }

    public addVertex(newVertex: Vertex){
        // If the vertex already exists, do nothing.
        if (this._nodes.find(v => v.id === newVertex.id)) {
            return true;
        }

        this._nodes.push(newVertex);
    }

    public addEdge(idV1: number, idV2: number){
        // if ( this._adjList.)
    }

    // get vertex
    private belongsToGraph(vertex: Vertex){

    }

}
