import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyDialogService } from '../services/lazy-dialog.service';
import { OnExit } from '../exit.guard';

@Component({
    selector: 'app-encode-video',
    templateUrl: './video.component.html',
    styleUrls: ['video.component.scss','../encode.component.scss']
})

export class EncodeVideoComponent implements OnInit, OnExit {

  public videoSource = "assets/videos/videoEncode.mp4";
  public videoLaunched = false;
    
  constructor(private _router: Router, private _route: ActivatedRoute, public lazyDialog: LazyDialogService) 
  {
  }

  ngOnInit(): void 
  {
    this.videoLaunched = false;
  }

  onExit() {
    //si confirma, envia al componente anterior
    if(this.videoLaunched == false) {
      const rta = confirm('¿Quieres salir del test?');
      return rta; 
    } else {
      return true;
    }

  }

  onVideoLaunched()
  {
    this.videoLaunched = true;
    this._router.navigate(["../video-dialog"], { relativeTo: this._route });
  }
  
}
