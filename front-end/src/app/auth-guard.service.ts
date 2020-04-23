import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(!this.loginService){
      this.router.navigate(['login']);
      return of(false);
    }
    return this.loginService.currentUser.pipe(
      switchMap((user) => {
        if (user) {
          return of(true);
        }
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }
}
