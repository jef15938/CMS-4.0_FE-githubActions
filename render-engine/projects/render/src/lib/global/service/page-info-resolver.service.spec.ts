import { TestBed } from '@angular/core/testing';

import { PageInfoResolverService } from './page-info-resolver.service';

describe('PageInfoResolverService', () => {
  let service: PageInfoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageInfoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
