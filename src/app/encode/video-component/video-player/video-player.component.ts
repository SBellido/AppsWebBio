import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { fromEvent, Observable } from 'rxjs';
import { VideoState, VIDEO_PATH } from '../../constants';

@Component({
  selector: 'app-encode-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class EncodeVideoPlayer implements OnInit, OnChanges {

  @ViewChild('video', { static: true }) private _video: ElementRef<HTMLVideoElement>;
  @Input() set videoState(state: VideoState) {
    switch (state) {
      case VideoState.Play:
        this._video.nativeElement.play();
        break;
      case VideoState.Pause:
        this._video.nativeElement.pause();
        break;
      default:
        break;
    }
  };

  private _videoEnded$: Observable<Event>;

  constructor(public videoPlayerDialogRef: MatDialogRef<EncodeVideoPlayer>) 
  {
  }
  
  get videoSource(): string {
    return VIDEO_PATH;
  } 
  
  ngOnInit(): void 
  {
    this._video.nativeElement.volume= 0.8;
    this._videoEnded$ = fromEvent(this._video.nativeElement,'ended');
    this._videoEnded$.subscribe(this._videoEndedObserver);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
    console.log("changes");
  }

  private _videoEndedObserver = () => {
    this.videoPlayerDialogRef.close(true);
  };
}
