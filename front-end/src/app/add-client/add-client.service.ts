import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientToAdd } from './add-client.component';



const server = environment.server;

@Injectable({
  providedIn: 'root'
})
export class AddClientService {

  constructor(private http: HttpClient) { }

  addClient(userId: number, client: ClientToAdd): Observable<any>{
    return this.http.post<any>(server+'/caseWorker/clients/add'+userId, {client});
  }
}
