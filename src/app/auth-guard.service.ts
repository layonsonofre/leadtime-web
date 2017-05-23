import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
   constructor(private dataService: DataService, private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url;
      return this.checkLogin(url);
   }

   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
   }

   canLoad(route: Route): boolean {
      let url = `/${route.path}`;

      return this.checkLogin(url);
   }

   checkLogin(url: string): boolean {
      if (this.dataService.isLoggedIn) {
         return true;
      }
      this.dataService.redirectUrl = url;
      let navigationExtras: NavigationExtras = {
         fragment: 'acesso'
      };
      this.router.navigate(['/login'], navigationExtras);
      return false;
   }
}
