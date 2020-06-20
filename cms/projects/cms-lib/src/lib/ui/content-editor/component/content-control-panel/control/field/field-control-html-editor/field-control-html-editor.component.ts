import { Component, OnInit, Inject } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { HtmlEditorServiceInterface } from './../../../../../../../ui/html-editor/html-editor.interface';
import { HTML_EDITOR_SERVICE } from './../../../../../../../ui/html-editor/html-editor.injection-token';

@Component({
  selector: 'cms-field-control-html-editor',
  templateUrl: './field-control-html-editor.component.html',
  styleUrls: ['./field-control-html-editor.component.scss']
})
export class FieldControlHtmlEditorComponent extends ContentControlBase implements OnInit {

  constructor(
    @Inject(HTML_EDITOR_SERVICE) private htmlEditorService: HtmlEditorServiceInterface,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  openEditor() {
    this.htmlEditorService.openEditor({
      title: `Html編輯 : ${this.selected.fieldInfo.fieldId}`,
      content: this.selected.fieldInfo.fieldVal
    }).subscribe(content => {
      if (content) {
        this.selected.fieldInfo.fieldVal = content;
        this.change.emit();
      }
    });
  }

}
