import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaTempComponent } from './qa-temp.component';

describe('QaTempComponent', () => {
  let component: QaTempComponent;
  let fixture: ComponentFixture<QaTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
