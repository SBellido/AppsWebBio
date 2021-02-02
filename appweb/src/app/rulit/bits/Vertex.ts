import { Circle } from "./Circle";

interface IVertex {
    id: number,
    esNodoInicial: boolean,
    esNodoFinal: boolean,
    visitado: boolean,
    circle: Circle,
    drawEdgeTo(connectedNode: Vertex): void
}

export class Vertex implements IVertex {

    private _circle: Circle;

    constructor (private _id: number, private _esNodoInicial: boolean, 
                private _esNodoFinal: boolean, private _visitado: boolean,
                theX: number, theY: number, theContext: CanvasRenderingContext2D){
                    this._circle = new Circle(25,theX,theY,"#000",theContext);
                    if (_esNodoInicial){
                        this._circle.fill = "#008F39"; // verde
                    }
                }
    
    get id(): number {
        return this._id;
    }

    get visitado(): boolean {
        return this._visitado;
    }

    set visitado(e:boolean) {
        this._circle.fill = "#008F39"; // verde
        this._visitado = e;
    }

    get esNodoInicial(): boolean {
        return this._esNodoInicial;
    }

    get esNodoFinal(): boolean {
        return this._esNodoFinal;
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
