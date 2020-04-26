import { Component, OnInit } from '@angular/core';
import { MainScreenService, Client, Company, User } from './main-screen.service';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})

export class MainScreenComponent implements OnInit {
  clients: Client[];
  companies: Company[];
  user: User;

  constructor(private readonly mainScreenService: MainScreenService, 
    private readonly loginService: LoginService,
    private readonly route: ActivatedRoute,
    private router: Router,) {
  }
  
  ngOnInit(): void {
    this.populate();

  }

  private populate() {
    this.mainScreenService.getClients().subscribe(
      //TODO populate firstNames, lastNames, phoneNumbers, status
      (clients: Client[]) => this.clients = clients
    );
    this.mainScreenService.getCompanies().subscribe(
      //TODO populate companyNames, companyFirstNames, companyLastNames, companyEmail, companyPhone
      (companies: Company[])=>this.companies = companies
    )
    this.loginService.currentUser.subscribe(
      (user: User) => this.user = user
    )
  }

  private goToEdit(type: boolean, name: String){
    if (type == true) {
      this.router.navigate(['editClientInfo']);
    } else {
      this.router.navigate(['editCompanyInfo'])
    }
  }

}
