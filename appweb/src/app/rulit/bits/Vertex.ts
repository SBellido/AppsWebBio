import { Circle } from "./Circle";

interface IVertex {
    id: number,
    esNodoInicial: boolean,
    esNodoFinal: boolean,
    visitado: boolean,
    circle: Circle
}

export class Vertex implements IVertex {

    private _circle: Circle;

    constructor (private _id: number, private _esNodoInicial: boolean, 
                private _esNodoFinal: boolean, private _visitado: boolean,
                theX: number, theY: number, theContext: CanvasRenderingContext2D){
                    
                    this._circle = new Circle(20,theX,theY,"#000",theContext);
                
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
}
