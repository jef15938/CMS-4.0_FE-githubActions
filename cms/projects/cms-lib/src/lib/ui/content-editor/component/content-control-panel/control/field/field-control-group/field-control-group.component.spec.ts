import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlGroupComponent } from './field-control-group.component';

describe('FieldControlGroupComponent', () => {
  let component: FieldControlGroupComponent;
  let fixture: ComponentFixture<FieldControlGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldControlGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldControlGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
