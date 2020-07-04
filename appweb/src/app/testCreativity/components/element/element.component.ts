import { Component, OnInit } from '@angular/core';

import { Element } from '../../../core/models/element.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.scss']
})

export class ElementComponent implements OnInit {

    constructor() { }

    element: Element = {
        id: 1,
        name: 'Clip',
        image: 'assets/images/clip.jpg'
    };

    ngOnInit(): void {

    }

}


