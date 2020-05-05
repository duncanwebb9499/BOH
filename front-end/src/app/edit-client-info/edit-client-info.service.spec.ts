import { TestBed } from '@angular/core/testing';

import { EditClientInfoService } from './edit-client-info.service';

describe('EditClientInfoService', () => {
  let service: EditClientInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditClientInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
