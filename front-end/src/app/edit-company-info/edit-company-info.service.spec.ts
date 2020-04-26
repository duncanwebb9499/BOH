import { TestBed } from '@angular/core/testing';

import { editCompanyService } from './edit-company-info.service';

describe('editCompanyService', () => {
  let service: editCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(editCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
