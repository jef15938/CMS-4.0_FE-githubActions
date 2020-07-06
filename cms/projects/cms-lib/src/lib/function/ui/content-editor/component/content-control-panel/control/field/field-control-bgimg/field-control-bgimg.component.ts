import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LayoutFieldBgimgDirective } from 'render';

@Component({
  selector: 'cms-field-control-bgimg',
  templateUrl: './field-control-bgimg.component.html',
  styleUrls: ['./field-control-bgimg.component.scss']
})
export class FieldControlBgimgComponent extends ContentControlBase implements OnInit, OnChanges {

  adviceFormat = '';
  adviceWidth = 0;
  adviceHeight = 0;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const selected = changes.selected.currentValue as TemplateFieldSelectEvent;
      const directive = selected.fieldDirective as LayoutFieldBgimgDirective;
      this.adviceFormat = directive.adviceFormat;
      this.adviceWidth = directive.adviceWidth;
      this.adviceHeight = directive.adviceHeight;
    }
  }

}
