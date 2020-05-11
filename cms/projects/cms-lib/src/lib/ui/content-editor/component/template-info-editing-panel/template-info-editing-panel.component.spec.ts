import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateInfoEditingPanelComponent } from './template-info-editing-panel.component';

describe('TemplateInfoEditingPanelComponent', () => {
  let component: TemplateInfoEditingPanelComponent;
  let fixture: ComponentFixture<TemplateInfoEditingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateInfoEditingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateInfoEditingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
