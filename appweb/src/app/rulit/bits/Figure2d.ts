interface IFigure2d {
    posX: number,
    posY: number,
    fill,
    draw(theContext: CanvasRenderingContext2D): void
}

export class Figure2d implements IFigure2d {

    constructor (
        private _posX: number, 
        private _posY: number, 
        private _fill
    ){}

    get posX () {
        return this._posX;
    }

    set posX (theX: number) {
        if (theX >= 0) {
            this._posX = theX;
        }
    }

    get posY () {
        return this._posY;
    }

    set posY (theY: number) {
        if (theY >= 0) {
            this._posY = theY;
        }
    }

    set fill (theFill) {
        this._fill = theFill;
    }
    
    get fill () {
        return this._fill;
    }
    
    draw (theContext: CanvasRenderingContext2D) {
        theContext.fillStyle = this._fill;
    }

}