import { Figure2d } from "./Figure2d";

interface ICircle {
    posX: number,
    posY: number,
    radius: number,
    fill,
    draw(theContext: CanvasRenderingContext2D): void,
    isPointInside(thePoint: { x: number, y: number}): boolean
}

export class Circle extends Figure2d implements ICircle{

    constructor(private _radius: number, theX: number, theY: number, theFill){
        super(theX,theY,theFill);
    }

    get radius(){
        return this._radius;
    }

    set radius(theRadius: number){
        if (theRadius > 0){
            this._radius = theRadius;
        }
    }

    draw(theContext: CanvasRenderingContext2D){

        super.draw(theContext);

        theContext.beginPath();
        theContext.arc(this.posX,this.posY,this.radius, 0, 2 * Math.PI);
        theContext.fill();

        theContext.closePath();

        theContext.restore();

    }

    isPointInside(thePoint: { x: number, y: number}): boolean{
        
        // console.log("the node");
        // console.log(this.posX);
        // console.log(this.posY);

        // console.log("the point");
        // console.log(thePoint.x);
        // console.log(thePoint.y);

        let distance =  (thePoint.x - this.posX) * (thePoint.x - this.posX) +
        (thePoint.y - this.posY) * (thePoint.y - this.posY);
        

        // console.log(distance);
        
        if (distance < (this.radius) * (this.radius)) {
            return true;
        }
        return false;

    }



}