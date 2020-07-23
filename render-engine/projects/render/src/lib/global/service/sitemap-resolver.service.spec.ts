import { TestBed } from '@angular/core/testing';

import { SitemapResolverService } from './sitemap-resolver.service';

describe('SitemapResolverService', () => {
  let service: SitemapResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitemapResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
