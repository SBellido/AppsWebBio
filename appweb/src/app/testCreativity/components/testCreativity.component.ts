import { Component, OnInit } from '@angular/core';

import { TestCreativity } from '../../core/models/testCreativity.module';
import { Proposal } from '../../core/models/proposal.module';

import { Clock } from '../../core/models/clock.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-testcreativity',
    templateUrl: './testCreativity.component.html',
    styleUrls: ['testCreativity.component.scss']
})

export class TestCreativityComponent implements OnInit {

    constructor() { }

    started = false;
    countDown = 3;
    audio = new Audio('assets/sounds/beep.mp3');

    ting = new Audio('/assets/sounds/ting.mp3');
    alertSecond = new Audio('/assets/sounds/second.mp3');

    clock: Clock = {
        seconds: -3,
        minutes: 0,
        state: 'started'
    };

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
        this.startClock();
    }

    countdown() {
        this.audio.play();
        setTimeout(() =>  {
            this.audio.play();
            this.countDown = 2;
            setTimeout(() =>  {
                this.audio.play();
                this.countDown = 1;
                setTimeout(() =>  {
                    this.started = true;
                }, 1000);
            }, 1000);
        }, 1000);
    }

    // INIT CLOCK FUNTIONS
    startClock() {
        const timeClock = setInterval(() => {
            this.controlSecondsMinutes();
            this.checkLastSeconds();
            if (this.clock.minutes === 1) {
                this.pauseTimer();
                this.ting.play();
                clearInterval(timeClock);
            }
        }, 1000);
    }

    checkLastSeconds() {
        let count = 0 ;
        if (this.clock.minutes === 0 && this.clock.seconds === 50) {
            this.clock.state = 'alert';
            const timeOut = setInterval(() => {
                this.playSoundSecond();
                count++;
                console.log(count);
                if (count === 9) {
                    clearInterval(timeOut);
                }
            },  1000);
        }
    }

    playSoundSecond() {
        this.alertSecond.play();
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

    alertTime() {
        const timeout = setInterval(() => {
            let count = 0;
            this.alertSecond.play();
            count ++;
            if (count <= 10) {
            count ++;
            } else {
                clearInterval(timeout);
            }
        }, 1000);
    }
    // END CLOCK FUNTIONS

}

