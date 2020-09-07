import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorContentComponent } from './html-editor-content.component';

describe('HtmlEditorContentComponent', () => {
  let component: HtmlEditorContentComponent;
  let fixture: ComponentFixture<HtmlEditorContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlEditorContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlEditorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
