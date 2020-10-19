import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorCreateLinkModalComponent } from './html-editor-create-link-modal.component';

describe('HtmlEditorCreateLinkModalComponent', () => {
  let component: HtmlEditorCreateLinkModalComponent;
  let fixture: ComponentFixture<HtmlEditorCreateLinkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlEditorCreateLinkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlEditorCreateLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
