import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const server = environment.server;

export interface Client {
  first_name: string;
  last_name: string;
  status: number;
  phone_number: string;
  id: number;
}
export interface Company {
  name: string;
  contact_first_name: string;
  contact_last_name: string;
  primary_phone: string;
  primary_email: string;
}
export interface User {
  username: string;
  id: number;
  logintype: string;
}

@Injectable({
  providedIn: 'root'
})
export class MainScreenService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(server + '/caseworker/clients');
  }
  getCompanies(): Observable<any> {
    return this.http.get<Company[]>(server + '/caseworker/companies');
  }
}
