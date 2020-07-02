import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFrameComponent } from './tab-frame.component';

describe('TabFrameComponent', () => {
  let component: TabFrameComponent;
  let fixture: ComponentFixture<TabFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
