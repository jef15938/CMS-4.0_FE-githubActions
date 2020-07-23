import { TestBed } from '@angular/core/testing';

import { TemplateInfoResolverService } from './template-info-resolver.service';

describe('TemplateInfoResolverService', () => {
  let service: TemplateInfoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateInfoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
