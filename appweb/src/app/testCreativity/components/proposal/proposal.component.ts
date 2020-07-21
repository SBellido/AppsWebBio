import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';

import { Proposal } from './../../../core/models/proposal.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-proposal',
    templateUrl: './proposal.component.html',
    styleUrls: ['./proposal.component.scss']
})

export class ProposalComponent implements OnInit {

    constructor() { }
    @Input() proposal: Proposal;
    // debo agregar el output en el componente padre
    @Output() proposalAggregate: EventEmitter<string> = new EventEmitter();

    empty = '';
    proposals = [];
    finalArray = [];

    ngOnInit() {
        setTimeout(() => {
            let arrayProposal: any;
            arrayProposal = this.proposal.description.split('\n');
            this.finalArray = this.validProposal(arrayProposal, this.empty);
            console.log(arrayProposal);
            console.log('El total de propuestas es ' + this.finalArray.length);
        }, 10000);
    }

    addProposal() {
        /*agrega propuesta al arreglo de propuestas*/
        console.log('agregó propuesta');
        this.proposalAggregate.emit(this.proposal.description);
        this.proposals.push(this.proposal.description);
        console.log(this.proposals);
    }

    validProposal(arrayProposal: string | any[], empty: any){
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < arrayProposal.length; i++) {
            const proposal = arrayProposal[i];
            if (proposal !== empty) {
                this.finalArray.push(proposal);
            }
        }
        return this.finalArray;
    }
}

