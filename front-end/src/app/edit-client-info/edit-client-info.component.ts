import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../main-screen/main-screen.service';
import { StatusCode, EditClientInfoService } from './edit-client-info.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-client-info',
  templateUrl: './edit-client-info.component.html',
  styleUrls: ['./edit-client-info.component.css']
})
export class EditClientInfoComponent implements OnInit {
  clientForm: FormGroup;
  selectedClient: Client;
  selectedClientObs: Observable<Client>;
  selectedClientId: number;
  statusCodes: StatusCode[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly editClientInfoService: EditClientInfoService
  ) { }

  ngOnInit(): void {
    this.selectedClientId = +this.route.snapshot.paramMap.get('id');
    this.clientForm = this.formBuilder.group({
      id: { value: this.selectedClientId, disabled: true },
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      status_id: '6', // action required by BOH
      phone_number: ''
    });
    forkJoin([
      this.editClientInfoService.getStatusCodes(),
      this.editClientInfoService.getClient(this.selectedClientId)
    ]).subscribe(
      ([statusCodes, client]) => {
        this.statusCodes = statusCodes;
        this.selectedClient = client;
        this.clientForm.patchValue({
          first_name: client.first_name,
          last_name: client.last_name,
          status_id: client.status_id.toString(),
          phone_number: client.phone_number
        });
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  onSubmit(): void {
    const formValues = this.clientForm.value;
    this.editClientInfoService.update({ id: this.selectedClientId, ...formValues }).subscribe(
      () => this.router.navigate(['/home']),
      (err) => {
        console.error(err);
        // message the user
      }
    );
  }
}
