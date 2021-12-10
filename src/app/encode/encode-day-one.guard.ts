import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EncodeUserService } from './services/EncodeUserService';

@Injectable({
  providedIn: 'root'
})
export class EncodeDayOneGuard implements CanActivate {
  
  constructor(private _userService: EncodeUserService, private _router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> 
  {
    return this.checkDays(route);
  }
  
  private async checkDays(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const userId: string = route.paramMap.get('userId');
    await this._userService.loadUser(userId);

    if (this._userService.user.dayOne.completed)
    {
      return this._router.parseUrl('/encode/dayTwo/'+userId);
    }

    return true;
  }
  
}
