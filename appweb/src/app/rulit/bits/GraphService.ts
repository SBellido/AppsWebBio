import { Graph } from "./Graph";
import { Vertex } from "./Vertex";

export interface INodeData {
    id: number,
    esNodoInicial: boolean,
    esNodoFinal: boolean,
    vecinos: Array<number>
}

export class GraphService {
    
    buildGraph(GRAPH_DATA: Array<INodeData>, theContext: CanvasRenderingContext2D): Graph{
        let newGraph = new Graph(theContext);
        GRAPH_DATA.forEach( nodeData => newGraph.addVertex(this.buildNode(nodeData, theContext)) );
        return newGraph;
    }
    
    private buildNode( nodeData: INodeData, theContext: CanvasRenderingContext2D): Vertex{
        return new Vertex(
            nodeData.id,
            nodeData.esNodoInicial, 
            nodeData.esNodoFinal,
            false,
            Math.random() * 600,
            Math.random() * 300,
            theContext
        );
    }


}