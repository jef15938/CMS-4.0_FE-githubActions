import { Component, OnInit } from '@angular/core';
import { ContentControlBase } from '../../_base';

@Component({
  selector: 'cms-field-control-text',
  templateUrl: './field-control-text.component.html',
  styleUrls: ['./field-control-text.component.scss']
})
export class FieldControlTextComponent extends ContentControlBase implements OnInit {

  ngOnInit(): void {
  }

}
