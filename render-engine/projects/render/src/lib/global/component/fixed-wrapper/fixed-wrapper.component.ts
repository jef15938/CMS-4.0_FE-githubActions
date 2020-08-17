import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';
import { ContentTemplateInfo } from '../../interface/content-template-info.interface';

@Component({
  selector: 'rdr-fixed-wrapper',
  templateUrl: './fixed-wrapper.component.html',
  styleUrls: ['./fixed-wrapper.component.scss']
})
export class FixedWrapperComponent extends CommonTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: ContentTemplateInfo = {
    id: '',
    templateId: 'FixedWrapper',
    fields: [],
    attributes: {
      templates: []
    },
  };

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
