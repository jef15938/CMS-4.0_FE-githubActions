import { Component, OnInit } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { HtmlEditorService } from '../../../../../../html-editor';

@Component({
  selector: 'cms-field-control-html-editor',
  templateUrl: './field-control-html-editor.component.html',
  styleUrls: ['./field-control-html-editor.component.scss']
})
export class FieldControlHtmlEditorComponent extends ContentControlBase implements OnInit {

  constructor(
    private htmlEditorService: HtmlEditorService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  openEditor() {
    this.htmlEditorService.openEditor({
      // title: `Html編輯 : ${this.selected.fieldInfo.fieldId}`,
      content: this.selected.fieldInfo.fieldVal
    }).subscribe(content => {
      console.warn('content = ', content);
      if (content || content === '') {
        this.selected.fieldInfo.fieldVal = content;
        this.change.emit();
      }
    });
  }

}
