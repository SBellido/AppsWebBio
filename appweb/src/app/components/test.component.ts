import { Component } from '@angular/core';

import { Test } from '../test.module';
import { Proposal } from '../proposal.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-test',
    templateUrl: './test.component.html'
})

export class TestComponent {
    test: Test = {
        id: 1,
        name: 'Test de Creatividad'
    };

    proposals: Proposal[] = [
        {
            id: 1,
            description: 'Hacer un avión de papel'
        },
        {
            id: 2,
            description: 'Envolver huevos'
        }
    ];

    /*agrega elemento al arreglo items*/
    addItem() {
        this.proposals.push();
    }

    /* indice de tipo number */
    deleteItem(index: number) {
    /*ejecuta la eliminación del indice e indica la cantidad de elementos a borrar*/
        this.proposals.splice(index, 1);
    }

}
