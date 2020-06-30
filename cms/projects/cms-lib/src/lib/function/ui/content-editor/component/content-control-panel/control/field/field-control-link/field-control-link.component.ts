import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LinkFieldInfo } from 'layout';

@Component({
  selector: 'cms-field-control-link',
  templateUrl: './field-control-link.component.html',
  styleUrls: ['./field-control-link.component.scss']
})
export class FieldControlLinkComponent extends ContentControlBase implements OnInit, OnChanges {

  fieldInfo: LinkFieldInfo;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const selected = changes.selected.currentValue as TemplateFieldSelectEvent;
      this.fieldInfo = selected.fieldInfo as LinkFieldInfo;
      this.fieldInfo.extension = this.fieldInfo.extension || {
        isTargetBlank: 'false'
      };
      this.fieldInfo.extension.isTargetBlank = this.fieldInfo.extension.isTargetBlank === 'true' ? 'true' : 'false';
    }
  }

}
