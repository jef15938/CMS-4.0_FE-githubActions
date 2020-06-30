import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlHtmlEditorComponent } from './field-control-html-editor.component';

describe('FieldControlHtmlEditorComponent', () => {
  let component: FieldControlHtmlEditorComponent;
  let fixture: ComponentFixture<FieldControlHtmlEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldControlHtmlEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldControlHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
