
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
}

@Injectable({
  providedIn: 'root'
})
export class editClientService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client> {
    return this.http.get<Client>(server + '/caseworker/clients/:id');
  }

}
