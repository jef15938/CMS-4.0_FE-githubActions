import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTempComponent } from './slider-temp.component';

describe('SliderTempComponent', () => {
  let component: SliderTempComponent;
  let fixture: ComponentFixture<SliderTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
