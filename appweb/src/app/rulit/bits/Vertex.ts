import { Circle } from "./Circle";

interface IVertex {
    id: number,
    isFirstNode: boolean,
    isLastNode: boolean,
    isActive: boolean,
    circle: Circle,
    drawEdgeTo(connectedNode: Vertex): void
}

export class Vertex implements IVertex {

    private _circle: Circle;

    constructor (private _id: number, private _isFirstNode: boolean, 
                private _isLastNode: boolean, private _isActive: boolean,
                theX: number, theY: number, theContext: CanvasRenderingContext2D){
                    this._circle = new Circle(20,theX,theY,"#000",theContext);
                    // if (_isFirstNode){
                    //     this._circle.fill = "#008F39"; // verde
                    // }
                    // if (_isLastNode){
                    //     this._circle.fill = "#ffcf02"; // amarillo
                    // }
                }
    
    get id(): number {
        return this._id;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(e:boolean) {
        e ? this._circle.fill = "#008F39" : this._circle.fill = "#000"; 
        this._isActive = e;
    }

    get isFirstNode(): boolean {
        return this._isFirstNode;
    }

    get isLastNode(): boolean {
        return this._isLastNode;
    }
    
    get circle(): Circle {
        return this._circle;
    }

    drawEdgeTo(connectedNode: Vertex) {
        this._circle.context.moveTo(this._circle.posX,this._circle.posY);
        this._circle.context.lineTo(connectedNode.circle.posX,connectedNode.circle.posY);
        this._circle.context.lineWidth = 1;
        this._circle.context.stroke();
        this._circle.context.closePath();
        this._circle.context.restore();
    }

}
