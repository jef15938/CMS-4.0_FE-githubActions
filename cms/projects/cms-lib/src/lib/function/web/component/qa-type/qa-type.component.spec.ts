import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaTypeComponent } from './qa-type.component';

describe('QaTypeComponent', () => {
  let component: QaTypeComponent;
  let fixture: ComponentFixture<QaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
