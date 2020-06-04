import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TestCreativity } from '../testCreativity.module';
import { Proposal } from '../proposal.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-testcreativity',
    templateUrl: './testCreativity.component.html'
})

export class TestCreativityComponent {

    @Input() proposal: Proposal;

    // debo agregar el output en el componente padre
    @Output() proposalAggregate: EventEmitter<string> = new EventEmitter();

    testCreativity: TestCreativity = {
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

}
