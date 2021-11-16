import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnExit } from '../exit.guard';
import { MatDialog } from '@angular/material/dialog';
import { ExitConfirmComponent } from '../exit-confirm-component/exit-confirm.component';
import { AudioRecorderService } from '../services/AudioRecorderService';

@Component({
    selector: 'app-encode-audios',
    templateUrl: './audios.component.html',
    styleUrls: ['audios.component.scss','../encode.component.scss']
})

export class EncodeAudiosComponent implements OnInit, OnExit {

  private audiosReady = false;
  private exitValue = false;

  constructor(private _router: Router, private _route: ActivatedRoute, private dialog: MatDialog, private _recorderService: AudioRecorderService) 
  {
  }

  ngOnInit(): void {
    this._recorderService.audioListChanged$.subscribe(
      { 
        next: () => {
          // TODO ir agregando a la lista de audios
          // if (this._recorderService.audioCount === 1)
          // {
          //   const audioData = this._recorderService.getAudioAt(0);
          //   this._audioUrl = this._createAudioUrl(audioData);
          //   this._openDialog();
          // }
        }
      });
  }

  onExit() {
    if(this.audiosReady == false) {
      if(this.exitValue == false) {
        this._openDialog();
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  private async _openDialog() {
    const dialogRef = this.dialog.open(ExitConfirmComponent, {});
    dialogRef.afterClosed().subscribe(this._dialogClosedObserver);
  }

  private _dialogClosedObserver = (result) => {
    if(result) {
      this.exitValue = true;
      this._router.navigate(["/"]);
    } else {
      this.exitValue = false;
    }
  }

  onAudiosReady()
  {
    //falta chequear por audios
    this.audiosReady = true;
    this._router.navigate(["../end"], { relativeTo: this._route });
  }
  
}
