import { Graph, IGraphNode } from "./Graph";
import { Vertex } from "./Vertex";


export class GraphService {
    
    buildGraph(GRAPH_DATA: Array<IGraphNode>, theContext: CanvasRenderingContext2D): Graph{
        let newGraph = new Graph(theContext);
        
        GRAPH_DATA.forEach( nodeData => { 
            // Agrego los nodos y las aristas
            let newNode = this.buildNode(nodeData, theContext);
            newGraph.addVertex(newNode, nodeData.edges);
        });
        
        return newGraph;
    }
    
    private buildNode( nodeData: IGraphNode, theContext: CanvasRenderingContext2D): Vertex{
        return new Vertex(
            nodeData.id,
            nodeData.isFirstNode, 
            nodeData.isLastNode,
            false,
            nodeData.column * 34,
            nodeData.row * 34,
            theContext
        );
    }


}