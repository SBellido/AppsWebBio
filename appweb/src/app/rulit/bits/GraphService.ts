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
        
        GRAPH_DATA.forEach( nodeData => { 
            // Agrego los nodos y las aristas
            let newNode = this.buildNode(nodeData, theContext);
            newGraph.addVertex(newNode, nodeData.vecinos);
        });
        
        return newGraph;
    }
    
    private buildNode( nodeData: INodeData, theContext: CanvasRenderingContext2D): Vertex{
        return new Vertex(
            nodeData.id,
            nodeData.esNodoInicial, 
            nodeData.esNodoFinal,
            false,
            Math.random() * 700,
            Math.random() * 500,
            theContext
        );
    }


}