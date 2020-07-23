import { Component, OnInit } from '@angular/core';

import { TestCreativity } from '../../core/models/testCreativity.module';
import { Clock } from '../../core/models/clock.module';
import { CreativeUser } from './../../core/models/creative-user.interface';

import { DataDbService } from '../../core/services/db/data-db.service';

import { Router } from '@angular/router';

@Component({
    // usaré ese selector como una etiqueta HTML en el template
    selector: 'app-testcreativity',
    templateUrl: './testCreativity.component.html',
    styleUrls: ['testCreativity.component.scss']
})

export class TestCreativityComponent implements OnInit {
    min = 0;
    max = 2;
    points = 0;
    constructor(private router: Router, private dbData: DataDbService) { }

    // INIT
    started = false;
    countDown = 3;

    // CLOCK
    clock: Clock = {
        seconds: 0,
        state: 'started',
        minutes: 0,
        limit: 1
    };

    // PROPOSAL
    empty = '';
    finalProposals = [];
    proposals = '';

    // USER
    user: CreativeUser;


    // TEST
    testCreativity: TestCreativity = {
        id: 1,
        name: 'Creatividad'
    };

    ngOnInit(): void {
        const creativeUser = this.getUser();
        if (!creativeUser) {
            this.router.navigate(['select-test']);
        }
        this.countdown();
    }

    getUser() {
        const creativeUser = JSON.parse(localStorage.getItem('creative-user'));
        return creativeUser;
    }

    countdown() {
        setTimeout(() => {
            this.countDown = 2;
            setTimeout(() => {
                this.countDown = 1;
                setTimeout(() => {
                    this.started = true;
                    this.startTest();
                }, 1000);
            }, 1000);
        }, 1000);
    }

    startTest() {
        const test = setInterval(() => {
            this.clock.seconds++;
            if (this.clock.seconds === 60) {
                this.clock.seconds = 0;
                this.clock.minutes++;
            }
            if (this.clock.minutes === this.clock.limit) {
                this.finalizedTest();
                clearInterval(test);
            }
        }, 1000);
    }
    // startTest() {
    //     const test = setInterval(() => {
    //         this.clock.seconds++;
    //         if (this.clock.seconds > this.clock.limit) {
    //             this.finalizedTest();
    //             clearInterval(test);
    //         }
    //     }, 1000);
    // }

    finalizedTest() {
        this.clock.state = 'finalized';
        let arrayProposal: any;
        arrayProposal = this.proposals.split('\n');
        this.finalProposals = this.validProposal(arrayProposal, this.empty);
        this.showProposal(this.finalProposals);
        const finalScore = this.getFinalScore();
        this.assingDataToUser();
        this.points = finalScore + this.finalProposals.length;
        console.log(this.points);
        this.saveInBBDD();
    }

    assingDataToUser() {
        this.user = JSON.parse(localStorage.getItem('creative-user'));
        this.user.proposal = this.finalProposals;
        this.user.points = this.points;
        console.log(this.user);
    }

    getFinalScore() {
        return this.min + Math.floor((this.max - this.min) * Math.random());
    }

    saveInBBDD() {
        this.dbData.saveContact(this.user);
        console.log('datos almacenados correctamente');
    }


    // FUNCTIONS PROPOSAL
    validProposal(arrayProposal: string | any[], empty: any) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < arrayProposal.length; i++) {
            const proposal = arrayProposal[i];
            if (proposal !== empty) {
                this.finalProposals.push(proposal);
            }
        }
        return this.finalProposals;
    }

    showProposal(finalProposals: any) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < finalProposals.length; i++) {
            const proposal = finalProposals[i];
            console.log('Propuesta ' + i + ': ' + proposal);
            // this.user.proposal.push(proposal);
        }
    }

}

