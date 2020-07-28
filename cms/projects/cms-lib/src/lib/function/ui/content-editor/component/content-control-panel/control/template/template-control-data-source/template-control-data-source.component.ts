import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { DataSourceTemplateInfo, LayoutWrapperSelectEvent, DataSourceTemplateBaseComponent } from '@neux/render';

@Component({
  selector: 'cms-template-control-data-source',
  templateUrl: './template-control-data-source.component.html',
  styleUrls: ['./template-control-data-source.component.scss']
})
export class TemplateControlDataSourceComponent extends ContentControlBase implements OnInit, OnChanges {

  templateInfo: DataSourceTemplateInfo;
  sourceType: string;

  souces: { value: string, display: string }[] = [
    { value: '1', display: '來源1' },
    { value: '2', display: '來源2' },
    { value: '3', display: '來源3' },
    { value: '4', display: '來源4' },
    { value: '5', display: '來源5' },
  ];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const event = changes.selected.currentValue as LayoutWrapperSelectEvent;
      this.templateInfo = event?.templateInfo as DataSourceTemplateInfo;
      this.sourceType = (event.componentRef.instance as DataSourceTemplateBaseComponent<any>).sourceType;
    }
  }

}
