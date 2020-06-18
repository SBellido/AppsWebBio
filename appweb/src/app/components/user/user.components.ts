import { Component, OnInit } from '@angular/core';

import { User } from '../../user.module';
// import { Proposal } from '../../proposal.module';

@Component({
     /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['user.component.scss']
})

export class UserComponent implements OnInit{
    constructor() { }

    // proposals: Proposal[] = [
    //     {
    //         id: 1,
    //         description: ''
    //     }
    // ];
    ngOnInit(): void {
    }

}
