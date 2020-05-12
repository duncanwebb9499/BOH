import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  loading = false;
  returnUrl: string;
  error: string;

  user: { id: number; username: string; logintype: string;};

  constructor(
    private readonly loginService: LoginService, 
    private readonly route: ActivatedRoute,
    private router: Router,
    ) { 
      if(this.loginService.currentUser){
        router.navigate(['/']);
      }
    }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }
  
  onSubmit() {
    //TODO: yeet
    this.loginService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).pipe(first()).subscribe(
      (data) => {
        if(data){                  
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.user = null;
          this.router.navigate(['/login']);
        }
      },
      (err: HttpErrorResponse) => {
        this.user = null;
        alert(err.message);
      }
    );
    this.loginForm.reset();
  }

}
