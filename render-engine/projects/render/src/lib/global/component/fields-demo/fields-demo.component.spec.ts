import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsDemoComponent } from './fields-demo.component';

describe('FieldsDemoComponent', () => {
  let component: FieldsDemoComponent;
  let fixture: ComponentFixture<FieldsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
