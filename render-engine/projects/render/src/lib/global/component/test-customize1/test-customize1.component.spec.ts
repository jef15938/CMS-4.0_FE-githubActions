import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCustomize1Component } from './test-customize1.component';

describe('TestCustomize1Component', () => {
  let component: TestCustomize1Component;
  let fixture: ComponentFixture<TestCustomize1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCustomize1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCustomize1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
