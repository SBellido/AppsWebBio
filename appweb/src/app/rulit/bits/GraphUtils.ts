import { ElementRef } from "@angular/core";
import { CanvasGraph } from "./CanvasGraph";
import { IGraphNode } from "./Graph";
import { Vertex } from "./Vertex";

const NODE_REGULAR_IMAGE_URL = "./assets/images/rulit-node-regular.svg"
const NODE_HOVER_IMAGE_URL = "./assets/images/rulit-node-hover.svg"
const NODE_START_IMAGE_URL = "./assets/images/rulit-node-start.svg"
const NODE_END_IMAGE_URL = "./assets/images/rulit-node-end.svg"

// Creates a new graph and adds nodes, edges and canvas.
export async function buildGraph(GRAPH_DATA: Array<IGraphNode>, theCanvas: ElementRef<HTMLCanvasElement>): Promise<CanvasGraph>{

    let nodeRegularImg = await loadImage(NODE_REGULAR_IMAGE_URL);
    let nodeHoverImg = await loadImage(NODE_HOVER_IMAGE_URL);
    let nodeStartImg = await loadImage(NODE_START_IMAGE_URL);
    let nodeEndImg = await loadImage(NODE_END_IMAGE_URL);

    let newGraph = new CanvasGraph(nodeRegularImg, nodeHoverImg , nodeStartImg, nodeEndImg);

    let nodeSpacing = theCanvas.nativeElement.width * 0.052;
    let nodeRadius = nodeSpacing * 0.6;

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

function loadImage(src): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}
