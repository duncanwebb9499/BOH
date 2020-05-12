import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const server = environment.server;


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public currentUser: Observable<any> = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(server + '/api/login', { username, password }).pipe(map(user => {
      this.currentUser = of(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    },
    (err: HttpErrorResponse) => {
      this.currentUser = null;
      return err;
    }));
  }

  reset(): void {
    const usr = this.validate();
    if (usr) {
      this.currentUser = of(JSON.parse(usr));
    }
  }

  validate(): any {
    return localStorage.getItem('currentUser');
  }

  resetLogin(){
    this.currentUser = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
