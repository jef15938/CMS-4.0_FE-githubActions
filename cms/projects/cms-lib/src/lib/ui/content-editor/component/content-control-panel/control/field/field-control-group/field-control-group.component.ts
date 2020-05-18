import { Component, OnInit } from '@angular/core';
import { ContentControlBase } from '../../_base';

@Component({
  selector: 'cms-field-control-group',
  templateUrl: './field-control-group.component.html',
  styleUrls: ['./field-control-group.component.scss']
})
export class FieldControlGroupComponent extends ContentControlBase implements OnInit {

  ngOnInit(): void {
  }

}
