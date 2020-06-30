import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorContainerModalComponent } from './html-editor-container-modal.component';

describe('HtmlEditorContainerModalComponent', () => {
  let component: HtmlEditorContainerModalComponent;
  let fixture: ComponentFixture<HtmlEditorContainerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlEditorContainerModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlEditorContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
