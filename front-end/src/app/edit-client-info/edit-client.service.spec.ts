import { TestBed } from '@angular/core/testing';

import { editClientService } from './edit-client.service';

describe('editClientService', () => {
  let service: editClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(editClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
