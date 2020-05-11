import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentControlPanelComponent } from './content-control-panel.component';

describe('ContentControlPanelComponent', () => {
  let component: ContentControlPanelComponent;
  let fixture: ComponentFixture<ContentControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
