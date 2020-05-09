import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from '../main-screen/main-screen.service';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCompanyInfoService, NeighborhoodCode } from './edit-company-info.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-company-info',
  templateUrl: './edit-company-info.component.html',
  styleUrls: ['./edit-company-info.component.css']
})
export class EditCompanyInfoComponent implements OnInit {
  companyForm: FormGroup;
  selectedCompany: Company;
  selectedCompanyObs: Observable<Company>;
  selectedCompanyID: number;
  neighborhoodCodes: NeighborhoodCode[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly editCompanyInfoService: EditCompanyInfoService)
    { }

  ngOnInit(): void {
    this.selectedCompanyID = +this.route.snapshot.paramMap.get('id');
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      primary_first_name: ['', Validators.required],
      primary_last_name: ['', Validators.required],
      primary_phone: ['', Validators.required], 
      primary_email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required],
      neighborhood_id: ['', Validators.required]
    });
    forkJoin([
      this.editCompanyInfoService.getNeighborhoodCodes(),
      this.editCompanyInfoService.getCompany(this.selectedCompanyID),
    ]).subscribe(
      ([neighborhoodCodes, company]) => {
        this.neighborhoodCodes = neighborhoodCodes;
        this.selectedCompany = company;
        console.log(JSON.stringify(this.selectedCompany));
        this.companyForm.patchValue({
          name: company.name,
          primary_first_name: company.primary_first_name,
          primary_last_name: company.primary_last_name,
          primary_phone: company.primary_phone,
          primary_email: company.primary_email,
          address: company.address1,
          city: company.city,
          state: company.state,
          zip_code: company.zip_code,
          neighborhood_id: company.neighborhood_id,
        });
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    )
  }
  onSubmit(): void {
    const formValues = this.companyForm.value;
    this.editCompanyInfoService.update({ id: this.selectedCompanyID, ...formValues }).subscribe(
      () => this.router.navigate(['/home']),
      (err) => {
        console.error(err);
        // message the user
      }
    );
  }

}
