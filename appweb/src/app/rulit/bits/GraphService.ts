import { ElementRef } from "@angular/core";
import { Graph, IGraphNode } from "./Graph";
import { Vertex } from "./Vertex";


export class GraphService {
    
    buildGraph(GRAPH_DATA: Array<IGraphNode>, theCanvas: ElementRef<HTMLCanvasElement>): Graph{
        
        let newGraph = new Graph(theCanvas);
        
        GRAPH_DATA.forEach( nodeData => { 
            // Agrego los nodos y las aristas
            let newNode = this.buildNode(nodeData);
            newGraph.addVertex(newNode, nodeData.edges);
        });
        
        return newGraph;
    }
    
    private buildNode( nodeData: IGraphNode ): Vertex{
        return new Vertex(
            nodeData.id,
            nodeData.isFirstNode, 
            nodeData.isLastNode,
            false,
            nodeData.column * 34,
            nodeData.row * 34
        );
    }


}