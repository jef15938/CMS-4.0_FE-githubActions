import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';
import { CollapseData } from './collapse.interface';

@Component({
  selector: 'rdr-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollapseComponent extends CustomizeBaseDirective implements OnInit {

  @Input() collapseList: Array<CollapseData>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
