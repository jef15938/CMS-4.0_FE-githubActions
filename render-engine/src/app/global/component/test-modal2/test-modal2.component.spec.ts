import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModal2Component } from './test-modal2.component';

describe('TestModal2Component', () => {
  let component: TestModal2Component;
  let fixture: ComponentFixture<TestModal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestModal2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestModal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
