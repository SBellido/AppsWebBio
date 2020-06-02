import { Component } from '@angular/core';

import { Proposal } from '../proposal.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-proposal',
    templateUrl: './proposal.component.html'
})

export class ProposalComponent {
    proposal: Proposal = {
        id: 1,
        description: 'Hacer un avión de papel'
    };

}
