import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorDescriptionComponent } from './html-editor-description.component';

describe('HtmlEditorDescriptionComponent', () => {
  let component: HtmlEditorDescriptionComponent;
  let fixture: ComponentFixture<HtmlEditorDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlEditorDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlEditorDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
