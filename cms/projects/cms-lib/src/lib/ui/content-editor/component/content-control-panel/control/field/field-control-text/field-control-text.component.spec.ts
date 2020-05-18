import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlTextComponent } from './field-control-text.component';

describe('FieldControlTextComponent', () => {
  let component: FieldControlTextComponent;
  let fixture: ComponentFixture<FieldControlTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldControlTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldControlTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
