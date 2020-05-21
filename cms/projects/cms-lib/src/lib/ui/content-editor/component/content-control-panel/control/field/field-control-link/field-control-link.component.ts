import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent } from 'layout';

@Component({
  selector: 'cms-field-control-link',
  templateUrl: './field-control-link.component.html',
  styleUrls: ['./field-control-link.component.scss']
})
export class FieldControlLinkComponent extends ContentControlBase implements OnInit, OnChanges {

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']) {
      const selected = changes['selected'].currentValue as TemplateFieldSelectEvent;
      console.warn(selected.fieldInfo);
      selected.fieldInfo.extension = selected.fieldInfo.extension || {};
      selected.fieldInfo.extension['isTargetBlank'] = selected.fieldInfo.extension['isTargetBlank'] === 'true' ? 'true' : 'false';
    }
  }

}
