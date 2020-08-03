import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper';
import { LayoutInfo } from '../../interface/layout-info.interface';

@Component({
  selector: 'rdr-layout-full',
  templateUrl: './layout-full.component.html',
  styleUrls: ['./layout-full.component.scss']
})
export class LayoutFullComponent extends CommonTemplateBaseComponent implements OnInit {
  defaultTemplateInfo: LayoutInfo;
  templateInfo: LayoutInfo;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void { }

}
