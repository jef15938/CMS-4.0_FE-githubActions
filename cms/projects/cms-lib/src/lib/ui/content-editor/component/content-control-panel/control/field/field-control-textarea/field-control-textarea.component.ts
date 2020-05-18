import { Component, OnInit } from '@angular/core';
import { ContentControlBase } from '../../_base';

@Component({
  selector: 'cms-field-control-textarea',
  templateUrl: './field-control-textarea.component.html',
  styleUrls: ['./field-control-textarea.component.scss']
})
export class FieldControlTextareaComponent extends ContentControlBase implements OnInit {

  ngOnInit(): void {
  }

}
