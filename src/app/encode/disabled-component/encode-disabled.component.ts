import { Component, OnInit } from '@angular/core';
import { EncodeUserService } from '../services/EncodeUserService';

@Component({
    selector: 'app-encode-disabled',
    templateUrl: './encode-disabled.component.html',
    styleUrls: ['../encode.component.scss','disabled.component.scss']
})

export class EncodeDisabledComponent implements OnInit {

  public userName: string;

  constructor(private _userService: EncodeUserService) 
  {
  }

  ngOnInit(): void 
  {
    this.userName = this._userService.user.name;
  }

}
