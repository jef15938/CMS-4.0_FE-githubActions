import { Component, OnInit } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { HtmlEditorService } from 'projects/cms-lib/src/lib/ui/html-editor/html-editor.service';

@Component({
  selector: 'cms-field-control-html-editor',
  templateUrl: './field-control-html-editor.component.html',
  styleUrls: ['./field-control-html-editor.component.scss']
})
export class FieldControlHtmlEditorComponent extends ContentControlBase implements OnInit {

  constructor(
    private _htmlEditorService: HtmlEditorService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  openEditor() {
    this._htmlEditorService.openEditor({
      title: `Html編輯 : ${this.selected?.fieldInfo?.fieldId}`,
      content: this.selected?.fieldInfo?.fieldVal
    }).subscribe();
  }

}
