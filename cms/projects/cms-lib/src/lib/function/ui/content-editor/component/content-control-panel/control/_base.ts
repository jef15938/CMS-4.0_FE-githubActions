import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { LayoutWrapperSelectEvent } from '@neux/render';
import { ContentEditorActionMode } from '../../../content-editor.interface';

@Directive()
export abstract class ContentControlBase {
  @Input() selected: LayoutWrapperSelectEvent;
  @Input() editorActionMode: ContentEditorActionMode;
  // tslint:disable-next-line: no-output-native
  @Output() change = new EventEmitter();
  get isTemplateMode() {
    return this.editorActionMode === ContentEditorActionMode.TEMPLATE;
  }
}
