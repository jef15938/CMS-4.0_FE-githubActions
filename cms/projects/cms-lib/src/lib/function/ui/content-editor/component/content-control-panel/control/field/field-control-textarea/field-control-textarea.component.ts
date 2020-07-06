import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LayoutFieldTextareaDirective } from 'render';

@Component({
  selector: 'cms-field-control-textarea',
  templateUrl: './field-control-textarea.component.html',
  styleUrls: ['./field-control-textarea.component.scss']
})
export class FieldControlTextareaComponent extends ContentControlBase implements OnInit, OnChanges {

  maxLength = 0;
  maxLines = 0;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const selected = changes.selected.currentValue as TemplateFieldSelectEvent;
      const directive = selected.fieldDirective as LayoutFieldTextareaDirective;
      this.maxLength = directive.maxLength > 0 ? directive.maxLength : 0;
      this.maxLines = directive.maxLines > 0 ? directive.maxLines : 0;
    }
  }

  onEnterDown(ev, value: string) {
    const lines = (value || '').split(/\r*\n/);
    if (this.maxLines && lines.length >= this.maxLines) {
      ev.stopPropagation();
      ev.preventDefault();
      alert(`行數最多允許${this.maxLines}行`);
    }
  }

  onPaste(ev: ClipboardEvent) {
    setTimeout(() => {
      const lines = ((this.selected.fieldInfo.fieldVal || '') as string).split(/\r*\n/);
      if (this.maxLines && lines.length > this.maxLines) {
        ev.stopPropagation();
        ev.preventDefault();
        alert(`行數最多允許${this.maxLines}行，多餘行數將被合併至最後一行`);
        const overLimitLines = lines.splice(this.maxLines - 1, lines.length - this.maxLines + 1);
        lines.push(overLimitLines.join(''));
        this.selected.fieldInfo.fieldVal = lines.join('\n');
      }
    }, 0);
    this.change.emit();
  }

}
