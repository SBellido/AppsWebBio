import { Component, OnInit } from '@angular/core';

import { TestCreativity } from '../../core/models/testCreativity.module';
import { Clock } from '../../core/models/clock.module';
import { CreativeUser } from './../../core/models/creative-user.interface';
import { Element } from './../../core/models/element.module';
import { DataDbService } from '../../core/services/db/data-db.service';

import { Router } from '@angular/router';

@Component({
    // usaré ese selector como una etiqueta HTML en el template
    selector: 'app-testcreativity',
    templateUrl: './testCreativity.component.html',
    styleUrls: ['testCreativity.component.scss']
})

export class TestCreativityComponent implements OnInit {

    constructor(private router: Router, private dbData: DataDbService) { }

    // INIT
    started = false;
    countDown = 4;
    alertDesert = false;

    // CLOCK
    controlTime = 59;

    clock: Clock = {
        seconds: this.controlTime,
        state: 'started',
        minutes: 4,
        limit: 0
    };

    // OBJECT
    elementClip: Element = {
        // variable codigo
        id: 1,
        name: 'Clip',
        image: 'assets/images/clip.jpg',
        code: '1a2b3c'
    };

    elementJournal: Element = {
        // variable codigo
        id: 2,
        name: 'Diario',
        image: 'assets/images/diario.jpg',
        code: '4d5e6f'
    };

    // PROPOSAL
    empty = '';
    finalProposals = [];
    proposals = '';

    // USER
    user: CreativeUser;

    points = 0;
    minRandom = 0;
    maxRandom = 2;

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
            this.countDown = 3;
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
        }, 1000);
    }

    startTest() {
        const test = setInterval(() => {
            if (this.clock.state === 'started') {
                this.clock.seconds--;
                if (this.clock.seconds === -1) {
                    this.clock.seconds = this.controlTime;
                    this.clock.minutes--;
                }
                if (this.clock.minutes === this.clock.limit
                    && this.clock.seconds === this.clock.limit) {
                    this.finalizedTest();
                    clearInterval(test);
                }
            }
        }, 1000);
    }

    activeAlert() {
        if (!this.alertDesert) {
            this.alertDesert = true;
        } else {
            this.alertDesert = false;
        }
    }

    finalizedTest() {
        this.resetClock();
        let arrayProposal: any;
        arrayProposal = this.proposals.split('\n');
        this.finalProposals = this.validProposal(arrayProposal, this.empty);
        this.showProposal(this.finalProposals);
        const finalScore = this.getFinalScore();
        this.points = finalScore + this.finalProposals.length;
        this.assingDataToUser();
        this.saveInBBDD();
        localStorage.clear();
    }

    assingDataToUser() {
        this.user = JSON.parse(localStorage.getItem('creative-user'));
        this.user.proposal = this.finalProposals;
        this.user.object = this.elementClip.name;
    }

    getFinalScore() {
        return this.minRandom + Math.floor((this.maxRandom - this.minRandom) * Math.random());
    }

    resetClock(){
        this.clock.minutes = 0;
        this.clock.seconds = 0;
        this.alertDesert = false;
        this.clock.state = 'finalized';
    }

    saveInBBDD() {
        this.dbData.saveContact(this.user);
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

