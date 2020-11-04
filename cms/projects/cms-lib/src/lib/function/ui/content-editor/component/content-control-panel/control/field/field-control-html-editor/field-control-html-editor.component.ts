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
    const content = this.selected.fieldInfo.fieldVal;
    this.htmlEditorService.openEditor({ content }).subscribe(newContnet => {
      if (newContnet !== content) {
        this.selected.fieldInfo.fieldVal = newContnet;
        this.change.emit();
      }
    });
  }

}
