import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { DataSourceTemplateInfo, LayoutWrapperSelectEvent, DataSourceTemplateBaseComponent } from '@neux/render';
import { ContentService } from '../../../../../../../../global/api/service/content/content.service';
import { ContentDataSourceModel } from '../../../../../../../../global/api/data-model/models/content-data-source.model';
import { ContentDataSourceActionModel, ContentDataSourceActionType } from '../../../../../../../../global/api/data-model/models/content-data-source-action.model';
import { FarmSharedService } from '../../../../../../farm-shared/farm-shared.service';

@Component({
  selector: 'cms-template-control-data-source',
  templateUrl: './template-control-data-source.component.html',
  styleUrls: ['./template-control-data-source.component.scss']
})
export class TemplateControlDataSourceComponent extends ContentControlBase implements OnInit, OnChanges {

  templateInfo: DataSourceTemplateInfo;
  sourceType: string;

  sources: ContentDataSourceModel[] = [];
  actions: ContentDataSourceActionModel[] = [];

  constructor(
    private contentService: ContentService,
    private farmSharedService: FarmSharedService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const event = changes.selected.currentValue as LayoutWrapperSelectEvent;
      this.templateInfo = event?.templateInfo as DataSourceTemplateInfo;
      this.sourceType = (event.componentRef.instance as DataSourceTemplateBaseComponent<any>).sourceType;
      this.contentService.getContentDataSourceByTypeID(this.sourceType).subscribe(res => {
        this.sources = res.datas || [];
        this.actions = res.actions || [];
      });
    }
  }

  doAction(action: ContentDataSourceActionModel) {
    switch (action.actionType) {
      case ContentDataSourceActionType.FARM:
        this.farmSharedService.openFarm(action.funcId);
        break;
    }
  }

}
