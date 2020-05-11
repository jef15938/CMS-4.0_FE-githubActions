import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSelectionPanelComponent } from './layout-selection-panel.component';

describe('LayoutSelectionPanelComponent', () => {
  let component: LayoutSelectionPanelComponent;
  let fixture: ComponentFixture<LayoutSelectionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSelectionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSelectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
