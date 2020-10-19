import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorInsertImgModalComponent } from './html-editor-insert-img-modal.component';

describe('HtmlEditorInsertImgModalComponent', () => {
  let component: HtmlEditorInsertImgModalComponent;
  let fixture: ComponentFixture<HtmlEditorInsertImgModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlEditorInsertImgModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlEditorInsertImgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
