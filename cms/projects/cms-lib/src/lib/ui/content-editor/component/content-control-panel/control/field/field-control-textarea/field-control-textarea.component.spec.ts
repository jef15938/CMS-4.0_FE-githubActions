import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlTextareaComponent } from './field-control-textarea.component';

describe('FieldControlTextareaComponent', () => {
  let component: FieldControlTextareaComponent;
  let fixture: ComponentFixture<FieldControlTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldControlTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldControlTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
