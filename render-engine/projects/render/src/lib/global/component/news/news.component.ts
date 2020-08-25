import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/layout-base/data-source-template-base.component';
import { NewsData } from './news.interface';
import { DataSourceTemplateInfo } from '../../interface/data-source-template-info.interface';
import { DataSourceType } from '../../enum';

@Component({
  selector: 'rdr-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends DataSourceTemplateBaseComponent<NewsData> {

  defaultTemplateInfo: DataSourceTemplateInfo = {
    id: '',
    templateId: 'news',
    fields: [],
    source: '',
    attributes: {
      height: '592px'
    }
  };

  sourceType = DataSourceType.News;

  month = {
    '01': 'JAN',
    '02': 'FEB',
    '03': 'MAR',
    '04': 'APR',
    '05': 'MAY',
    '06': 'JUN',
    '07': 'JUL',
    '08': 'AUG',
    '09': 'SEP',
    10: 'OCT',
    11: 'NOV',
    12: 'DEC',
  };

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }



}
