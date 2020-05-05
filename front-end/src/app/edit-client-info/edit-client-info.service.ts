import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../main-screen/main-screen.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


const server = environment.server;

@Injectable({
  providedIn: 'root'
})
export class EditClientInfoService {

  constructor(private http: HttpClient) { }
  
  getClient(ClientId: number): Observable<Client> {
    return this.http.get<Client>(server+'/caseworker/clients/'+ClientId )
  }
}
