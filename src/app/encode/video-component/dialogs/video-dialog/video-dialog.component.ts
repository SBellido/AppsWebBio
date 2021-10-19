import { NgModule, Component, ElementRef, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { LazyDialogService } from 'src/app/encode/services/lazy-dialog.service';

@Component({
  selector: 'app-my-video',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss'],
})
export class MyVideoComponent implements OnInit {

  @ViewChild('video', { static: true }) private _video: ElementRef<HTMLVideoElement>;
  private _videoEnded$: Observable<Event>;
  public videoSource = "assets/videos/videoEncode.mp4";

  constructor(private _router: Router, private _route: ActivatedRoute, public lazyDialog: LazyDialogService) 
  {
  }

  ngOnInit(): void 
  {
    this._video.nativeElement.play();
    this._video.nativeElement.volume= 0.8;
    this._videoEnded$ = fromEvent(this._video.nativeElement,'ended');
    this._videoEnded$.subscribe(this._videoEndedObserver);
  }

  private _videoEndedObserver = () => {
    this.lazyDialog.closeDialog();
  };
}

@NgModule({
  imports: [MatDialogModule]
})
export class MyVideoModule {}