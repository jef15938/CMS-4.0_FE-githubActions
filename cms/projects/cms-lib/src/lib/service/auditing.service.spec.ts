import { TestBed } from '@angular/core/testing';

import { AuditingService } from './auditing.service';

describe('AuditingService', () => {
  let service: AuditingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
