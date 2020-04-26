import { Component, OnInit } from '@angular/core';
import { editClientService, Client} from './edit-client.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import {MainScreenComponent} from '../main-screen/main-screen.component'


@Component({
  selector: 'app-edit-client-info',
  templateUrl: './edit-client-info.component.html',
  styleUrls: ['./edit-client-info.component.css']
})
export class EditClientInfoComponent implements OnInit {
  client: Client;

  constructor(private readonly editClientService: editClientService, private location: Location) {
  }

  ngOnInit(): void {
    this.populate();
  }

  private populate() {
    this.editClientService.getClients().subscribe(
      //TODO populate firstNames, lastNames, phoneNumbers, status
      (client: Client) => this.client = client
    );
    }
 
    goBack(): void {
    this.location.back();
  }


}
