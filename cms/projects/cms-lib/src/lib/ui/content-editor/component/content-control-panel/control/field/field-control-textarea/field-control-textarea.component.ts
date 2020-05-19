import { Component, OnInit } from '@angular/core';
import { ContentControlBase } from '../../_base';

@Component({
  selector: 'cms-field-control-textarea',
  templateUrl: './field-control-textarea.component.html',
  styleUrls: ['./field-control-textarea.component.scss']
})
export class FieldControlTextareaComponent extends ContentControlBase implements OnInit {

  readonly maxNewLine = 10;
  ngOnInit(): void {
  }

  onEnterDown(ev, value: string) {
    const lines = (value || '').split(/\r*\n/);
    if (lines.length >= this.maxNewLine) {
      ev.stopPropagation();
      ev.preventDefault();
      alert(`行數最多允許${this.maxNewLine}行`);
    }
  }

  onPaste(ev: ClipboardEvent) {
    setTimeout(() => {
      const lines = ((this.selected.fieldInfo.fieldVal || '') as string).split(/\r*\n/);
      if (lines.length > this.maxNewLine) {
        ev.stopPropagation();
        ev.preventDefault();
        alert(`行數最多允許${this.maxNewLine}行，多餘行數將被合併至最後一行`);
        const overLimitLines = lines.splice(this.maxNewLine - 1, lines.length - this.maxNewLine + 1);
        lines.push(overLimitLines.join(''));
        this.selected.fieldInfo.fieldVal = lines.join("\n");
      }
    }, 0);
    this.change.emit();
  }

}
