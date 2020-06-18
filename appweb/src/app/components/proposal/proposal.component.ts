import { Component,
    Input,
    Output,
    EventEmitter,
    OnInit
} from '@angular/core';

import { Proposal } from '../../proposal.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-proposal',
    templateUrl: './proposal.component.html',
    styleUrls: ['./proposal.component.scss']
})

export class ProposalComponent implements OnInit {

    constructor() { }

    // declaramos nuestro componente de tipo input
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
    // enteredText debe ser el input del textarea
    // var enteredText = document.getElementById("textArea").value;

    // var numberOfLineBreaks = (enteredText.match(/\n/g)||[]).length;
    // var characterCount = enteredText.length + numberOfLineBreaks;

    // alert('Number of breaks:  ' + numberOfLineBreaks);

    // let aa = enteredText.split("\n");
    // console.log(aa);
}
