import { Component, OnInit } from '@angular/core';

import { TestCreativity } from '../../testCreativity.module';
import { Proposal } from '../../proposal.module';
// import { Clock } from '../../clock.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-testcreativity',
    templateUrl: './testCreativity.component.html',
    styleUrls: ['testCreativity.component.scss']
})

export class TestCreativityComponent implements OnInit {

    constructor() { }

    testCreativity: TestCreativity = {
        id: 1,
        name: 'Test de Creatividad'
    };

    proposals: Proposal[] = [
        {
            id: 1,
            description: ''
        }
    ];

    addProposalToTextarea(description: string){
        console.log('Propuesta');
        console.log(description);
    }


    ngOnInit(): void {
    }

}
