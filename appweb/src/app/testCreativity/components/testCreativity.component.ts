import { Component, OnInit } from '@angular/core';

import { TestCreativity } from '../../core/models/testCreativity.module';
import { Proposal } from '../../core/models/proposal.module';

// import { Clock } from '../../clock.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-testcreativity',
    templateUrl: './testCreativity.component.html',
    styleUrls: ['testCreativity.component.scss']
})

export class TestCreativityComponent implements OnInit {
    started = false;
    time = 3;
    audio = new Audio('assets/sounds/beep.mp3');


    constructor() { }

    testCreativity: TestCreativity = {
        id: 1,
        name: 'Creatividad'
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
        this.countdown();
    }

    countdown() {
        this.audio.play();
        setTimeout(() =>  {
            this.audio.play();
            this.time = 2;
            setTimeout(() =>  {
                this.audio.play();
                this.time = 1;
                setTimeout(() =>  {
                    this.started = true;
                }, 1000);
            }, 1000);
        }, 1000);
    }

}

