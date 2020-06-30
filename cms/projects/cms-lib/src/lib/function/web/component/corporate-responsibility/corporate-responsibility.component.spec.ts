import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateResponsibilityComponent } from './corporate-responsibility.component';

describe('CorporateResponsibilityComponent', () => {
  let component: CorporateResponsibilityComponent;
  let fixture: ComponentFixture<CorporateResponsibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateResponsibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
