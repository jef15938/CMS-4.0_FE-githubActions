import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableFrameComponent } from './scrollable-frame.component';

describe('ScrollableFrameComponent', () => {
  let component: ScrollableFrameComponent;
  let fixture: ComponentFixture<ScrollableFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollableFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollableFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
