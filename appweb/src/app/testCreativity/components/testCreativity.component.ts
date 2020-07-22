import { Component, OnInit } from '@angular/core';

import { TestCreativity } from '../../core/models/testCreativity.module';
import { Clock } from '../../core/models/clock.module';
import { Proposal } from './../../core/models/proposal.module';

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
    countDown = 3;

// CLOCK
    clock: Clock = {
        seconds: -3,
        minutes: 0,
        state: 'started'
    };

// PROPOSAL
    empty = '';
    proposals = [];
    finalArray = [];

    proposal: Proposal = {
        description: ''
    };

    testCreativity: TestCreativity = {
        id: 1,
        name: 'Creatividad'
    };

// TEST
    ngOnInit(): void {
        this.verifyData();
        this.countdown();
        this.startClock();
        const test = setInterval(() => {
            let arrayProposal: any;
            arrayProposal = this.proposal.description.split('\n');
            if (this.clock.state === 'finalized') {
                this.finalArray = this.validProposal(arrayProposal, this.empty);
                // this.dbData.saveContact(this.dataCreativeUser.value);
                console.log(arrayProposal);
                console.log('El total de propuestas es ' + this.finalArray.length);
                clearInterval(test);
            }
        }, 1000);
        // this.saveInBBDD();
    }
    // saveInBBDD() {

    //     this.dbData.saveContact(this.dataCreativeUser.value);
    // }

    verifyData() {
        const creativeUser =  JSON.parse(localStorage.getItem('creative-user'));
        console.log(creativeUser);
        if (creativeUser == null) {
            this.router.navigate(['personal-info']);
        }
        return creativeUser;
    }

    countdown() {
        setTimeout(() =>  {
            this.countDown = 2;
            setTimeout(() =>  {
                this.countDown = 1;
                setTimeout(() =>  {
                    this.started = true;
                }, 1000);
            }, 1000);
        }, 1000);
    }

// FUNCTIONS PROPOSAL
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

// CLOCK FUNTIONS
    startClock() {
        const timeClock = setInterval(() => {
            this.controlSecondsMinutes();
            if (this.clock.minutes === 1) {
                this.pauseTimer();
                // this.ting.play();
                clearInterval(timeClock);
            }
        }, 1000);
    }

    controlSecondsMinutes() {
        if (this.clock.state !== 'finalized') {
            this.clock.seconds++;
            if (this.clock.seconds >= 60){
              this.clock.minutes++;
              this.clock.seconds = 0;
            }
          }
    }

    pauseTimer(): void {
        this.clock.state = 'finalized';
    }

    resetTimer() {
        this.clock.state = 'started';
        this.clock.minutes = 0;
        this.clock.seconds = -3;
    }

}

