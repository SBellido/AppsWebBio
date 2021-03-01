import { ElementRef } from "@angular/core";
import { Graph } from "./Graph";
import { Vertex } from "./Vertex";

export const COLOR_WHITE = "#FFF";
export const COLOR_GREEN = "#90C14B";
export const COLOR_RED = "#E52F2D";
export const COLOR_VIOLET = "#4A4067";


interface ICanvasGraph {
    draw(): void,
    getNodeAtPosition(clientX: number,clientY: number ): Vertex | undefined,
    flickerNode(newNode: Vertex): void
}

export class CanvasGraph extends Graph implements ICanvasGraph {

    private _canvas: ElementRef<HTMLCanvasElement>;
    private context: CanvasRenderingContext2D;
    
    constructor(){
        super();
    }

    set canvas(theCanvas: ElementRef<HTMLCanvasElement>){
        this._canvas = theCanvas;
        this.context = this._canvas.nativeElement.getContext("2d");
    }

    // Draws edges first and then nodes
    draw() {

        // Clear canvas
        let canvasRect = this._canvas.nativeElement.getBoundingClientRect();
        this.context.clearRect(0, 0, canvasRect.width, canvasRect.height);

        // Draw edges of each node
        for (const [theNode, edges] of this.adjList.entries()) {
            edges.forEach( connectedNodeId => {
                let connectedNode = this.getNodeById(connectedNodeId);
                this.drawEdgeBetweenNodes(theNode,connectedNode);
            });
        }

        // Draw nodes
        this.nodes.forEach(node => node.draw(this.context));
    }

    private drawEdgeBetweenNodes(theNode: Vertex, connectedNode: Vertex) {
        this.context.beginPath();
        this.context.moveTo(theNode.circle.posX, theNode.circle.posY);
        this.context.lineTo(connectedNode.circle.posX,connectedNode.circle.posY);
        this.context.strokeStyle = COLOR_VIOLET;
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
    }

    // Searchs canvas for a node using event absolute coordinates
    getNodeAtPosition( clientX: number, clientY: number ): Vertex | undefined {
        
        let canvasRect = this._canvas.nativeElement.getBoundingClientRect();

        let thePosition = {
            x: clientX - canvasRect.left,
            y: clientY - canvasRect.top
        }

        let theNode: Vertex;

        this.nodes.forEach( node => {
            if ( node.circle.isPointInside(thePosition) ) theNode = node;
        });

        return theNode ? theNode : undefined;

    }

    // Node flickers in red when incorrect
    flickerNode(newNode: Vertex): void {
        
        let frame = 0;
        this.currentNode.circle.fill = COLOR_WHITE;
        
        const i = setInterval( () => {
            (Math.abs(frame % 2) == 1) ? newNode.circle.fill = COLOR_RED : newNode.resetColor();
            this.draw();
            frame++;
            let requestId = requestAnimationFrame(() => this.flickerNode );

            if (frame >= 5) {
                this.currentNode.resetColor();
                newNode.resetColor();
                this.draw();
                cancelAnimationFrame(requestId);
                clearInterval(i);
            }
        } , 100);
        
    }

}