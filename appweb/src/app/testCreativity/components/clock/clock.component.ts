import {
    Component,
    OnChanges,
    SimpleChanges,
    OnInit,
    DoCheck,
    OnDestroy
} from '@angular/core';

import { Clock } from '../../../core/models/clock.module';

@Component({
    /*usaré ese selector como una etiqueta HTML en el template*/
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})

export class ClockComponent implements OnInit, OnDestroy {

    constructor() { }

    clock: Clock = {
        seconds: 0,
        minutes: 0,
        paused: false

    };

    ngOnInit() {
        setInterval(() => {
            // tslint:disable-next-line: triple-equals
            if (this.clock.paused == false) {
                this.clock.seconds++;
                if (this.clock.seconds >= 60){
                this.clock.minutes++;
                this.clock.seconds = 0;
              }
                this.getCurrentTime();
            }
          }, 1000);
    }

    pauseTimer(): void {
        this.clock.paused = true;
      }

      getCurrentTime() {
        let timeText = '';
        if (this.clock.seconds < 10) {
            timeText += this.clock.minutes + this.clock.seconds;
            if (this.clock.minutes === 1) {
                this.clock.paused = true;
            }
        } else {
            timeText += this.clock.minutes + this.clock.seconds;
        }
        return timeText;
    }

  resetTimer() {
    this.clock.paused = false;
    this.clock.minutes = 0;
    this.clock.seconds = -1;
  }

    // ngDoCheck() {
    //     console.log('ngDoCheck');
    // }

    // ngOnChanges(changes: SimpleChanges) {
    //     console.log('ngOnChanges');
    //     console.log(changes);
    // }

ngOnDestroy() {
        console.log('ngOnDestroy');
    }
}



