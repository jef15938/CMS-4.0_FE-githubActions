import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LayoutFieldImgDirective } from 'layout';

@Component({
  selector: 'cms-field-control-img',
  templateUrl: './field-control-img.component.html',
  styleUrls: ['./field-control-img.component.scss']
})
export class FieldControlImgComponent extends ContentControlBase implements OnInit, OnChanges {

  adviceFormat = '';
  adviceWidth = 0;
  adviceHeight = 0;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']) {
      const selected = changes['selected'].currentValue as TemplateFieldSelectEvent;
      const directive = selected.fieldDirective as LayoutFieldImgDirective;
      this.adviceFormat = directive.adviceFormat;
      this.adviceWidth = directive.adviceWidth;
      this.adviceHeight = directive.adviceHeight;
    }
  }

}
