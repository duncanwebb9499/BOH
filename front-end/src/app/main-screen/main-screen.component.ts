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
  clientsSearchable: Client[];
  companies: Company[];
  companiesSearchable: Company[];
  user: User;

  constructor(private readonly mainScreenService: MainScreenService, 
    readonly loginService: LoginService,
    private readonly route: ActivatedRoute,
    private router: Router,) {
  }
  
  ngOnInit(): void {
    this.populate();
  }

  searchClients(filterValue: string){
    this.clients = this.clientsSearchable.filter(c => (c.first_name+' '+c.last_name).toLowerCase().indexOf(filterValue.trim().toLowerCase()) > -1);
  }

  searchCompanies(filterValue: string){
    this.companies = this.companiesSearchable.filter(c => c.name.toLowerCase().indexOf(filterValue.trim().toLowerCase()) > -1);
  }

  private populate() {
    this.mainScreenService.getClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
        this.clientsSearchable = clients;
      }
    );
    this.mainScreenService.getCompanies().subscribe(
      (companies: Company[]) => {
        this.companies = companies;
        this.companiesSearchable = companies;
      }
    )
    this.loginService.currentUser.subscribe(
      (user: User) => this.user = user
    )
  }
}
