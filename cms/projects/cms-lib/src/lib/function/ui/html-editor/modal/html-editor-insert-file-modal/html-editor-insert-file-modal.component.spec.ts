import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorInsertFileModalComponent } from './html-editor-insert-file-modal.component';

describe('HtmlEditorInsertFileModalComponent', () => {
  let component: HtmlEditorInsertFileModalComponent;
  let fixture: ComponentFixture<HtmlEditorInsertFileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlEditorInsertFileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlEditorInsertFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
