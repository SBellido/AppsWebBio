import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EncodeUserService } from './services/EncodeUserService';
import { IEncodeUser } from "./models/IEncodeUser";

@Injectable({
  providedIn: 'root'
})
export class EncodeDaysGuard implements CanActivate {
  
  constructor(private _userService: EncodeUserService, private _router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> 
  {
    return this.checkAbandoned(route);
  }
  
  private async checkAbandoned(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const userId: string = route.paramMap.get('userId');


    return true;
  }
  
}
