import { TestBed } from '@angular/core/testing';

import { EditCompanyInfoService } from './edit-company-info.service';

describe('EditCompanyInfoService', () => {
  let service: EditCompanyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCompanyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
