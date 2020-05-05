import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../main-screen/main-screen.service';
import { EditClientInfoService } from './edit-client-info.service';
import { Observable } from 'rxjs';
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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly editClientInfoService: EditClientInfoService
  ) { }

  ngOnInit(): void {
    this.selectedClientId = +this.route.snapshot.paramMap.get('id');
    this.selectedClientObs = this.editClientInfoService.getClient(this.selectedClientId);
    this.getClientFromObs();
    this.clientForm = this.formBuilder.group({
      id: { value: this.selectedClientId, disabled: true },
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      status_id: '',
      phone_number: ''
    });
  }

  getClientFromObs() {
    if (!this.selectedClientObs) {
      this.selectedClient = null;
    } else {
      this.selectedClientObs.subscribe(
        (client: Client) => {
          console.log(client);
          this.selectedClient = client;
          this.clientForm.patchValue({
            id: client.id,
            first_name: client.first_name,
            last_name: client.last_name,
            status_id: client.status,
            phone_number: client.phone_number
          });
          console.log(this.selectedClient);
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
    }
    console.log(this.selectedClient);
  }

  onSubmit(): void {
    const formValues = this.clientForm.value;
    this.editClientInfoService.update(formValues).subscribe(
      () => console.log('success!'),
      (err) => {
        console.error(err);
        // message the user
      }
    );
  }
}
