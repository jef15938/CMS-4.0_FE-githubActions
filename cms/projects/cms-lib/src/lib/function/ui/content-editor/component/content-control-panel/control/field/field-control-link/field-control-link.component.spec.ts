import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlLinkComponent } from './field-control-link.component';

describe('FieldControlLinkComponent', () => {
  let component: FieldControlLinkComponent;
  let fixture: ComponentFixture<FieldControlLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldControlLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldControlLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
