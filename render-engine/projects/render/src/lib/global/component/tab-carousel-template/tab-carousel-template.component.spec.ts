import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCarouselTemplateComponent } from './tab-carousel-template.component';

describe('TabCarouselTemplateComponent', () => {
  let component: TabCarouselTemplateComponent;
  let fixture: ComponentFixture<TabCarouselTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCarouselTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCarouselTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
