import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTypeComponent } from './slider-type.component';

describe('SliderTypeComponent', () => {
  let component: SliderTypeComponent;
  let fixture: ComponentFixture<SliderTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
