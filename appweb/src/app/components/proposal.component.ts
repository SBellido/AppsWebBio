import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Proposal } from '../proposal.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-proposal',
    templateUrl: './proposal.component.html'
})

export class ProposalComponent {
    @Input() proposal: Proposal;
    // debo agregar el output en el componente padre
    @Output() proposalAggregate: EventEmitter<string> = new EventEmitter();

    addProposal() {
        console.log('agregó propuesta');
        this.proposalAggregate.emit(this.proposal.description);
    }
}
