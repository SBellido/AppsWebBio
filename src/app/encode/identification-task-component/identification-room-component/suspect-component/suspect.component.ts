import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { Subject } from 'rxjs';
import { ABSENT_SUSPECT_ID } from 'src/app/encode/constants';
import { IEncodeSuspect } from 'src/app/encode/models/IEncodeSuspect';

@Component({
  selector: 'app-encode-suspect',
  templateUrl: './suspect.component.html',
  styleUrls: ['./suspect.component.scss','../../../encode.component.scss']
})
export class EncodeSuspect implements AfterViewInit{
  
  private _suspect: IEncodeSuspect;
  private _selectedSuspectSource: Subject<IEncodeSuspect>;
  private _isSelected: boolean;
  private _suspectIndex: number;
  
  @ViewChild('suspectButton') 
  private _suspectButton: MatRadioButton;
  
  get suspectPhotoUrl(): string {
    return this._suspect.photoImageUrl;
  };
  
  @Input() 
  set suspect(suspect: IEncodeSuspect) {
    this._suspect = suspect;
  };

  @Input() 
  set suspectIndex(index: number) {
    this._suspectIndex = index;
  };
  
  @Input() 
  set selectedSuspectSource(selectedSuspectSource: Subject<IEncodeSuspect|null>) {
    this._selectedSuspectSource = selectedSuspectSource;
    this._selectedSuspectSource.asObservable()
      .subscribe(this._selectedSuspectChange$);
  };

  get isSelected(): boolean {
    return this._isSelected;
  };

  get suspectId(): string {
    return this._suspect.id;
  }

  get absentSuspectId(): string {
    return ABSENT_SUSPECT_ID;
  }
  
  get suspectIndex(): number {
    return this._suspectIndex;
  }
  
  constructor() 
  {
  }
  
  async ngAfterViewInit(): Promise<void> {
    this._suspectButton.change.subscribe(this.selectSuspect);
  }

  public selectSuspect = () => {
    this._isSelected = true;
    this._suspectButton.checked = true;
    this._selectedSuspectSource.next(this._suspect);
  }

  private _selectedSuspectChange$ = (suspect: IEncodeSuspect|null) => {
    
    if (suspect === null) return;
    
    if (suspect.id === this._suspect.id) return;
    
    
    console.log("selected suspect changed, deselecting");
    console.log(this._suspect);

    this._isSelected = false;
    this._suspectButton.checked = false;
  }

}
