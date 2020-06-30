import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';

import { Proposal } from '../../../../core/models/proposal.module';

@Component({
     /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['user.component.scss']
})

export class UserComponent implements OnInit{
    constructor() { }
    @Input() proposal: Proposal;
    // debo agregar el output en el componente padre
    @Output() proposalAggregate: EventEmitter<string> = new EventEmitter();

    proposals = [];

    ngOnInit(): void {
        setTimeout(() => {
            let arrayProposal: any;
            arrayProposal = this.proposal.description.split('\n');
            console.log(arrayProposal);
        }, 10000);
    }

    addProposal() {
        /*agrega propuesta al arreglo de propuestas*/
        console.log('agregó propuesta');
        this.proposalAggregate.emit(this.proposal.description);
        this.proposals.push(this.proposal.description);
        console.log(this.proposals);
    }
}
