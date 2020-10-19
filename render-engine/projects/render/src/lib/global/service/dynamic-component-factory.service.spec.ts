import { TestBed } from '@angular/core/testing';

import { DynamicComponentFactoryService } from './dynamic-component-factory.service';

describe('DynamicComponentFactoryService', () => {
  let service: DynamicComponentFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
