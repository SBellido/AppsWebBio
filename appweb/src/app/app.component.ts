import { Component } from '@angular/core';
import { Proposal } from './proposal.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  proposals: Proposal[] = [
    {
        id: 1,
        description: ''
    }
  ];

  addProposal(description: string){
    console.log('Propuesta');
    console.log(description);

  }

}

