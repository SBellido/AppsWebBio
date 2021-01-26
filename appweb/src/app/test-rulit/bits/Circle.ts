import { Figure2d } from "./Figure2d";

interface ICircle {
    posX: number,
    posY: number,
    radius: number,
    fill,
    draw(): void,
    isPointInside(thePoint: { x: number, y: number}): boolean
}

export class Circle extends Figure2d implements ICircle{

    constructor(private _radius: number, theX: number, theY: number, theFill, theContext: CanvasRenderingContext2D){
        super(theX,theY,theFill,theContext);
    }

    get radius(){
        return this._radius;
    }

    set radius(theRadius: number){
        if (theRadius > 0){
            this._radius = theRadius;
        }
    }

    draw(){

        super.draw();

        this.context.save();

        this.context.beginPath();
        this.context.arc(this.posX,this.posY,this.radius, 0, 2 * Math.PI);
        this.context.fill();

        this.context.closePath();

        this.context.restore();

    }

    isPointInside(thePoint: { x: number, y: number}): boolean{
        
        let distance =  (thePoint.x - this.posX) * (thePoint.x - this.posX) +
        (thePoint.y - this.posY) * (thePoint.y - this.posY);
        
        if (distance < (this.radius) * (this.radius)) {
            return true;
        }
        return false;

    }



}