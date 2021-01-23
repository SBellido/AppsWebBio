import { Injectable } from "@angular/core";
import { Graph } from "./Graph";

@Injectable({
    providedIn: 'root'
})

export class GraphService {
    
    public build(GRAPH_DATA: Array<any>): Graph{
        console.log('contruyendo grafo: ');
        console.log(GRAPH_DATA);
        return new Graph();
    }

}