import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditorContainerModalComponent } from './content-editor-container-modal.component';

describe('ContentEditorContainerModalComponent', () => {
  let component: ContentEditorContainerModalComponent;
  let fixture: ComponentFixture<ContentEditorContainerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentEditorContainerModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEditorContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
