import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncodeUserService } from '../services/EncodeUserService';
import { SessionsEnum, SomnolenceDegree } from "../constants";

@Component({
    selector: 'app-encode-somnolence-degree',
    templateUrl: './somnolence-degree.component.html',
    styleUrls: ['somnolence-degree.component.scss','../encode.component.scss']
})
export class EncodeSomnolenceDegreeComponent implements OnInit {

  public somnolenceDegreeFormGroup: FormGroup;
  
  get somnolenceDegrees() 
  {
    return SomnolenceDegree;
  }

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _userService: EncodeUserService,
    private _location: Location) 
  {
    this.somnolenceDegreeFormGroup = this._buildSomnolenceDegreeFormGroup();
  }
  
  ngOnInit(): void 
  {
  }
  
  onSaveForm()
  {
    const formData: SomnolenceDegree = this.somnolenceDegreeFormGroup.get('somnolenceDegree').value;
    if (!this._userService.user.sessionOne.completed) {
      this._userService.user.sessionOne.somnolenceDegree = formData;
    } else if (this._userService.user.sessionOne.completed) {
      this._userService.user.sessionTwo.somnolenceDegree = formData;
    }

    if (this._userService.session == SessionsEnum.SessionTwo) 
    {
      this._router.navigate(["../suspect-identification"], { relativeTo: this._route });
    } else if (this._userService.session == SessionsEnum.SessionOne) 
    {
      this._router.navigate(["../google-forms"], { relativeTo: this._route });
    }
  }

  back(): void {
    this._location.back();
  }

  private _buildSomnolenceDegreeFormGroup(): FormGroup {
    const somnolenceFormFields = new FormGroup({
      somnolenceDegree: new FormControl(this.somnolenceDegrees.totallyAwake, [ Validators.required ]),
    });
   
    return somnolenceFormFields;
  }
  
}
