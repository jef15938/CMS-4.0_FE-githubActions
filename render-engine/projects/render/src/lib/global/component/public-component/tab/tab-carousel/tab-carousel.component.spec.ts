import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCarouselComponent } from './tab-carousel.component';

describe('TabCarouselComponent', () => {
  let component: TabCarouselComponent;
  let fixture: ComponentFixture<TabCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
