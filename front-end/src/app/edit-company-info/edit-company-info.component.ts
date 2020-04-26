import { Component, OnInit } from '@angular/core';
import { editCompanyService,Company} from './edit-company-info.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import {MainScreenComponent} from '../main-screen/main-screen.component'


@Component({
  selector: 'app-edit-client-info',
  templateUrl: './edit-client-info.component.html',
  styleUrls: ['./edit-client-info.component.css']
})
export class EditCompanyInfoComponent implements OnInit {
  companies: Company;

  constructor(private readonly editCompanyService: editCompanyService, private location: Location) {
  }

  ngOnInit(): void {
    this.populate();
  }

  private populate() {
    this.editCompanyService.getCompanies().subscribe(
      //TODO populate firstNames, lastNames, phoneNumbers, status
      (companies: Company) => this.companies = companies
    );
    }
 
    goBack(): void {
    this.location.back();
  }


}

