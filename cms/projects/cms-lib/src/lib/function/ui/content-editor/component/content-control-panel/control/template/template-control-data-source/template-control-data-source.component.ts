import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { DataSourceTemplateInfo, LayoutWrapperSelectEvent, DataSourceTemplateBaseComponent } from '@neux/render';
import { ContentDataSourceModel } from '../../../../../../../../global/api/data-model/models/content-data-source.model';
import { ContentDataSourceActionModel } from '../../../../../../../../global/api/data-model/models/content-data-source-action.model';

@Component({
  selector: 'cms-template-control-data-source',
  templateUrl: './template-control-data-source.component.html',
  styleUrls: ['./template-control-data-source.component.scss']
})
export class TemplateControlDataSourceComponent extends ContentControlBase implements OnInit, OnChanges {

  templateInfo: DataSourceTemplateInfo;
  typeId: string;

  @Input() sources: ContentDataSourceModel[] = [];
  actions: ContentDataSourceActionModel[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const event = changes.selected.currentValue as LayoutWrapperSelectEvent;
      this.templateInfo = event?.templateInfo as DataSourceTemplateInfo;
      this.typeId = (event.componentRef.instance as DataSourceTemplateBaseComponent<any>).TYPE_ID;
    }
  }

}
