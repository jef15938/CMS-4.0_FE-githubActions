import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LayoutFieldTextDirective } from '@neux/render';

@Component({
  selector: 'cms-field-control-text',
  templateUrl: './field-control-text.component.html',
  styleUrls: ['./field-control-text.component.scss']
})
export class FieldControlTextComponent extends ContentControlBase implements OnInit, OnChanges {

  maxLength = 0;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const selected = changes.selected.currentValue as TemplateFieldSelectEvent;
      const directive = selected.fieldDirective as LayoutFieldTextDirective;
      this.maxLength = directive.maxLength > 0 ? directive.maxLength : 0;
    }
  }

}
