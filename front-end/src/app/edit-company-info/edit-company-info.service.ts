import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../main-screen/main-screen.service';


const server = environment.server;

export class NeighborhoodCode {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class EditCompanyInfoService {

  constructor(private http: HttpClient) { }

  getCompany(companyID: number): Observable<Company> {
    return this.http.get<Company>(server + '/caseworker/companies/' + companyID);
  }

  getNeighborhoodCodes(): Observable<NeighborhoodCode[]> {
    return this.http.get<NeighborhoodCode[]>(server + '/companies/neighborhood-codes');
  }

  update(company: Company): Observable<any> {
    return this.http.put(
      server + '/caseworker/companies/' + company.id,
      JSON.stringify(company)
    );
  }
}

