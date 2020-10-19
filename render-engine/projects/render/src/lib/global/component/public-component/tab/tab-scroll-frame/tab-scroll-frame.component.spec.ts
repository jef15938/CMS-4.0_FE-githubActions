import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabScrollFrameComponent } from './tab-scroll-frame.component';

describe('TabScrollFrameComponent', () => {
  let component: TabScrollFrameComponent;
  let fixture: ComponentFixture<TabScrollFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabScrollFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabScrollFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
