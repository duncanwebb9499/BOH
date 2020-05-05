import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../main-screen/main-screen.service';
import { EditClientInfoService } from './edit-client-info.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-client-info',
  templateUrl: './edit-client-info.component.html',
  styleUrls: ['./edit-client-info.component.css']
})
export class EditClientInfoComponent implements OnInit {

  selectedClient: Client;
  selectedClientObs: Observable<Client>;
  selectedClientId: number;
  
  constructor(private readonly route: ActivatedRoute, private readonly editClientInfoService: EditClientInfoService) { }

  ngOnInit(): void {
    this.selectedClientId = this.route.snapshot.params['id'];
    this.selectedClientObs = this.editClientInfoService.getClient(this.selectedClientId);
    this.getClientFromObs();
  }

  getClientFromObs(){
    if(!this.selectedClientObs){
      this.selectedClient = null;
    }
    else{
      this.selectedClientObs.subscribe(
        (client: Client)=>{
          console.log(client);
          this.selectedClient.first_name = client.first_name;
          this.selectedClient.id = client.id;
          this.selectedClient.last_name = client.last_name;
          this.selectedClient.phone_number = client.phone_number;
          this.selectedClient.status = client.status;
        },
        (err: HttpErrorResponse)=>{
          console.log(err.message);
        }
      )
    }
    console.log(this.selectedClient);

  }

}
