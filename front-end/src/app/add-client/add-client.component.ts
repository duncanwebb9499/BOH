import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { MainScreenComponent } from '../main-screen/main-screen.component';
import { EditClientInfoService, StatusCode } from '../edit-client-info/edit-client-info.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../main-screen/main-screen.service';
import { AddClientService } from './add-client.service';
import { Router } from '@angular/router';

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
    private readonly router: Router,
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
      lph_resident: [], 
      owns_car: [], 
      has_license: [], 
      ride_available: [], 
      status_id: ['', Validators.required]
    });
    this.editClientInfoService.getStatusCodes().subscribe(
      (statusCodes) => {this.statusCodes = statusCodes},
      (err: HttpErrorResponse) => console.error(err),
    )


  }
  onSubmit(){
    this.updateValues();
    const formValues = this.addClientForm.value;
    //TODO: ADD CLIENT HTTP REQUEST
    alert("Client Data Received");
    this.router.navigate(['home']);

    
    

  }
  updateValues(){
    (this.addClientForm.controls.lph_resident.value !== null)?
      this.addClientForm.controls.lph_resident.setValue(true):this.addClientForm.controls.lph_resident.setValue(false);
    (this.addClientForm.controls.owns_car.value !== null)?
      this.addClientForm.controls.owns_car.setValue(true):this.addClientForm.controls.owns_car.setValue(false);
    (this.addClientForm.controls.has_license.value !== null)?
      this.addClientForm.controls.has_license.setValue(true):this.addClientForm.controls.has_license.setValue(false);
    (this.addClientForm.controls.ride_available.value !== null)?
      this.addClientForm.controls.ride_available.setValue(true):this.addClientForm.controls.ride_available.setValue(false);
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
