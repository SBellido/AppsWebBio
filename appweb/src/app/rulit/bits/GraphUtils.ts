import { ElementRef } from "@angular/core";
import { CanvasGraph } from "./CanvasGraph";
import { IGraphNode } from "./Graph";
import { Vertex } from "./Vertex";

// Creates a new graph and adds nodes, edges and canvas.
export function buildGraph(GRAPH_DATA: Array<IGraphNode>, theCanvas: ElementRef<HTMLCanvasElement>): CanvasGraph{

    let newGraph = new CanvasGraph();

    let nodeSpacing = theCanvas.nativeElement.width * 0.052;
    let nodeRadius = nodeSpacing * 0.6;

    console.log(nodeRadius);

    // Add nodes and edges from GRAPH_DATA object
    GRAPH_DATA.forEach( nodeData => { 
        let newNode = buildNode(nodeData, nodeSpacing, nodeRadius);
        newGraph.addVertex(newNode, nodeData.edges);
    });
    
    newGraph.canvas = theCanvas;
    
    return newGraph;
}

function buildNode( nodeData: IGraphNode, nodeSpacing: number, nodeRadius: number ): Vertex {
    return new Vertex(
        nodeData.id,
        nodeData.isFirstNode, 
        nodeData.isLastNode,
        false,
        nodeData.column * nodeSpacing,
        nodeData.row * nodeSpacing,
        nodeRadius
    );
}
