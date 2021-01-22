

export class Vertex  {

    constructor (private _id: number, private _esNodoInicial: boolean = false, 
                private _esNodoFinal: boolean = false, private _visitado: boolean = false){}
    
    get id(): number{
        return this._id;
    }

    get visitado(): boolean {
        return this._visitado;
    }

    get esNodoInicial(): boolean {
        return this._esNodoInicial;
    }

    get esNodoFinal(): boolean {
        return this._esNodoFinal;
    }

    set visitado(e:boolean){
        this._visitado = e;
    }
    
}
