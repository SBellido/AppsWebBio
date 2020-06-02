import { Component } from '@angular/core';

import { Element } from '../element.module'; 

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-element',
    templateUrl: './element.component.html'
})

export class ElementComponent {
    element: Element = {
        id: 1,
        name: 'Diario',
        image: 'assets/images/diario.jpg'
    };

}


