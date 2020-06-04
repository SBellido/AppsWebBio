import { Component } from '@angular/core';

import { TestCreativity } from '../../testCreativity.module';
import { Proposal } from '../../proposal.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-testcreativity',
    templateUrl: './testCreativity.component.html',
    styleUrls: ['testCreativity.component.scss']
})

export class TestCreativityComponent {

    testCreativity: TestCreativity = {
        id: 1,
        name: 'Test de Creatividad'
    };

}
