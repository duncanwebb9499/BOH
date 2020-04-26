
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const server = environment.server;

export interface Company {
  name: string;
  contact_first_name: string;
  contact_last_name: string;
  primary_phone: string;
  primary_email: string;
}

@Injectable({
  providedIn: 'root'
})
export class editCompanyService {

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get<Company[]>(server + '/caseworker/companies');
  }

}