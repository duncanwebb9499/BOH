import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { MainScreenComponent } from '../main-screen/main-screen.component';
import { EditClientInfoService, StatusCode } from '../edit-client-info/edit-client-info.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../main-screen/main-screen.service';
import { AddClientService } from './add-client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  addClientForm: FormGroup;
  statusCodes: StatusCode[];
  currentUser: User;

  constructor(
    private readonly formBuilder: FormBuilder,
    readonly loginService: LoginService,
    private readonly editClientInfoService: EditClientInfoService,
    private readonly addClientService: AddClientService,

  ) { }

  ngOnInit(): void {
    this.loginService.currentUser.subscribe(
      (user: User) => this.currentUser = user
    );
    this.addClientForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      sex: ['', Validators.required], 
      lph_resident: [''], 
      owns_car: [''], 
      has_license: [''], 
      ride_available: [''], 
      status_id: ['', Validators.required]
    });
    this.editClientInfoService.getStatusCodes().subscribe(
      (statusCodes) => {this.statusCodes = statusCodes},
      (err: HttpErrorResponse) => console.error(err),
    )


  }
  onSubmit(){
    const formValues = this.addClientForm.value;
    alert("Client Information Received");
  }

  


}
export class ClientToAdd {
    first_name: string;
    last_name: string;
    sex: string;
    lph_resident: boolean;
    owns_car: boolean;
    has_license: boolean;
    ride_available: boolean;
    status_id: number;   
}
