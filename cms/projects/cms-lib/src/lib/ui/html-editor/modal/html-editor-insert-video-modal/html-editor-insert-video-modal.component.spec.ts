import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorInsertVideoModalComponent } from './html-editor-insert-video-modal.component';

describe('HtmlEditorInsertVideoModalComponent', () => {
  let component: HtmlEditorInsertVideoModalComponent;
  let fixture: ComponentFixture<HtmlEditorInsertVideoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlEditorInsertVideoModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlEditorInsertVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
