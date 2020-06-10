import { Component, OnInit, Inject } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { IHtmlEditorService } from './../../../../../../../ui/html-editor/html-editor.interface';
import { HtmlEditorServiceInjectionToken } from './../../../../../../../ui/html-editor/html-editor.injection-token';

@Component({
  selector: 'cms-field-control-html-editor',
  templateUrl: './field-control-html-editor.component.html',
  styleUrls: ['./field-control-html-editor.component.scss']
})
export class FieldControlHtmlEditorComponent extends ContentControlBase implements OnInit {

  constructor(
    @Inject(HtmlEditorServiceInjectionToken) private _htmlEditorService: IHtmlEditorService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  openEditor() {
    this._htmlEditorService.openEditor({
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
