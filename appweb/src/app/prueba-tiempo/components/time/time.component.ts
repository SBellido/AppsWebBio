import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {
  // time = new Date();
   minutes = 0;
   seconds = 0;
   paused = false;

  constructor() { }


// setInterval(function(){
//   if (!this.paused) {
//     this.seconds++;
//     if (this.seconds >= 60){
//       this.minutes++;
//       const seconds = 0;
//     }
//     displayTime();
//   }
// }, 1000);


  ngOnInit(): void {
    setInterval(() => {
    if (!this.paused) {
      this.seconds++;
      if (this.seconds >= 60){
        this.minutes++;
        this.seconds = 0;
      }
      this.getCurrentTime();
    }
  }, 1000);
    // setInterval(() => {
    //   this.time = new Date();
    //   this.time.setSeconds(0);
    //   this.time.setMinutes(0);
    // }, 1000);
  }

  // displayTime(){
  //   getCurrentTime();
  // }

  pauseTimer() {
    this.paused = true;
  }

  getCurrentTime() {
    let timeText = '';
    if (this.seconds < 10) {
      timeText += this.minutes + ':0' + this.seconds;
    } else {
      timeText += this.minutes + ':' + this.seconds;
    }
    return timeText;
  }

  resetTimer() {
    this.paused = false;
    this.minutes = 0;
    this.seconds = -1;
  }

}




