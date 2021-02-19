import { Circle } from "./Circle";

interface IVertex {
    id: number,
    isFirstNode: boolean,
    isLastNode: boolean,
    isActive: boolean,
    circle: Circle
}

export class Vertex implements IVertex {

    private _circle: Circle;

    constructor (   private _id: number, 
                    private _isFirstNode: boolean, 
                    private _isLastNode: boolean, 
                    private _isActive: boolean,
                    theX: number, 
                    theY: number,
                    radius ){
                    this._circle = new Circle(radius,theX,theY,"#000");
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

}
