import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCarouselFrameComponent } from './tab-carousel-frame.component';

describe('TabCarouselFrameComponent', () => {
  let component: TabCarouselFrameComponent;
  let fixture: ComponentFixture<TabCarouselFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCarouselFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCarouselFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
