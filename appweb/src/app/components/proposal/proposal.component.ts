import { Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { Proposal } from '../../proposal.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-proposal',
    templateUrl: './proposal.component.html',
    styleUrls: ['./proposal.component.scss']
})

export class ProposalComponent {
    // declaramos nuestro componente de tipo input
    @Input() proposal: Proposal;
    // debo agregar el output en el componente padre
    @Output() proposalAggregate: EventEmitter<string> = new EventEmitter();

    proposals = [];

    addProposal() {
        /*agrega propuesta al arreglo de propuestas*/
        console.log('agregó propuesta');
        this.proposalAggregate.emit(this.proposal.description);
        this.proposals.push(this.proposal.description);
        console.log(this.proposals);
    }

}
