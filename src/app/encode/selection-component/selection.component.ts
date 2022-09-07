import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncodeUserService } from '../services/EncodeUserService';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { IEncodeScreenshot } from '../models/IEncodeScreenshot';
import { OnExit } from '../exit.guard';
import { MatDialog } from '@angular/material/dialog';
import { ExitConfirmComponent } from '../exit-confirm-component/exit-confirm.component';
import { SCREENSHOTS_COUNT, SORTING_INSTRUCTIONS } from '../constants';
import { lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { EncodeFirestoreService } from 'src/app/core/encodeFirestore.service';
import { EncodeStorageService } from 'src/app/core/encodeStorage.service';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { IEncodeInstructionsParams } from '../models/IEncodeInstructionsParams';


@Component({
    selector: 'app-encode-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['selection.component.scss','../encode.component.scss']
})
export class EncodeSelectionComponent implements OnInit, OnExit {
  public imagesPairs: IEncodeScreenshot[];
  public steps: number = SCREENSHOTS_COUNT;
  public random_pairs = [];
  public currentStep = 0;
  public selectionMade = false;
  public completed = false;
  public userChoices: Array<IEncodeScreenshot> = [];
  public userChoice: IEncodeScreenshot;
  public imagesPairsLoaded = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _encodeFirestoreService: EncodeFirestoreService,
              private _encodeStorageService: EncodeStorageService,
              private _userService: EncodeUserService,
              private _dialog: MatDialog) 
  {
  }

  async onExit(): Promise<any> {
    const exitDialogRef = this._dialog.open(ExitConfirmComponent);
    exitDialogRef.afterClosed().subscribe(this._exitDialogClosed$);
    const exit$ = exitDialogRef.afterClosed() as unknown as Observable<unknown>;
    return await lastValueFrom(exit$);
  }

  private _exitDialogClosed$ = async (response: boolean): Promise<boolean> => {
    if (response == true){ 
      await this._userService.abandonTest();
      this._router.navigate(["/"]);
    } 

    return false;
  }

  async getScreenshotPairs() 
  {
    if (this._userService.encodeTasksResources == null) {
      this._userService.encodeTasksResources = (await this._encodeFirestoreService.getTasksResources()).data();
    }
    
    const taskResources = this._userService.encodeTasksResources;
    this.imagesPairs = (await this._getScreenshot(taskResources.screenshotsPairs)).map(snap => snap.data());

    this.imagesPairs.forEach( async (screenshot: IEncodeScreenshot, index) => {
      screenshot.id = taskResources.screenshotsPairs[index].id;
      const fileRef = this._encodeStorageService.getCloudStorageFileRef(screenshot.imageStorageRef);
      screenshot.imageURL = await this._encodeStorageService.getDownloadURL(fileRef);
    });
      
    let pairNumber = 1;
    this.imagesPairs.forEach( (screenshot: IEncodeScreenshot, index) => {
      screenshot.pairNumber = pairNumber ;
      if ((index % 2) == 1) pairNumber++;
    });

    this.imagesPairsLoaded = true;
  }

  ngOnInit() 
  {
    this.getScreenshotPairs();

    for (let i = 0; i < SCREENSHOTS_COUNT; i++) {
      this.random_pairs.push(Math.floor(Math.random() * (1 - 0 + 1) + 0));
    }
  }

  onSelection(image): void
  {
    this.userChoice = image;

    this.selectionMade = true;
  }

  continue() {
    if (this.completed) {
      //routear a ordenamiento
      this.onExit = async () => true;

      let instructions_params: IEncodeInstructionsParams = {
        title: 'Tarea de Ordenamiento',
        instructions: SORTING_INSTRUCTIONS,
        nextRouteToNavigate: '../sorting'
      };
  
      this._router.navigate(['../instructions'], { 
        relativeTo: this._route,
        queryParams: instructions_params });
      return;
    }
  }

  onConfirm(): any 
  {
    if (this.currentStep < SCREENSHOTS_COUNT) {
      this.userChoices.push(this.userChoice);
      this.currentStep = this.currentStep + 1;
      this.selectionMade = false;
    }

    if (this.userChoices.length == SCREENSHOTS_COUNT) {
      this.completed = true;
      this._userService.user.sessionTwo.imageSelectionResponse = this.userChoices;
    }
  }

  private _getScreenshot(screenshotDocuments: Array<DocumentReference<IEncodeScreenshot>>): Promise<DocumentSnapshot<IEncodeScreenshot>[]> {
    let screenshots = new Array<Promise<DocumentSnapshot<IEncodeScreenshot>>>();

    screenshotDocuments.forEach( docRef => {
      const screenshotId = docRef.id;
      const screenshot = this._encodeFirestoreService.getScreenshot(screenshotId);
      screenshots.push(screenshot);
    });

    return Promise.all(screenshots);
  }

}