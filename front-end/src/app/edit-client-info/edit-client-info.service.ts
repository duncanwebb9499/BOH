import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../main-screen/main-screen.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const server = environment.server;

export interface StatusCode {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class EditClientInfoService {
  constructor(private http: HttpClient) { }

  getClient(ClientId: number): Observable<Client> {
    return this.http.get<Client>(server + '/caseworker/clients/' + ClientId );
  }

  getStatusCodes(): Observable<StatusCode[]> {
    return this.http.get<StatusCode[]>(server + '/clients/status-codes');
  }

  update(client: Client): Observable<any> {
    return this.http.put(
      server + '/caseworker/clients/' + client.id,
      JSON.stringify(client)
    );
  }
}
