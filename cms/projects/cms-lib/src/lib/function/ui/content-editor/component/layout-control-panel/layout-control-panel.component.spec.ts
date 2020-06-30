import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutControlPanelComponent } from './layout-control-panel.component';

describe('LayoutControlPanelComponent', () => {
  let component: LayoutControlPanelComponent;
  let fixture: ComponentFixture<LayoutControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
