import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/template-base/data-source-template-base.component';
import { DataSourceTemplateInfo, NewsData } from '../../interface/data-source.interface';
import { CardNewsData } from '../public-component/card/card-news/card-news.component';

const TEMPLATE_ID = 'news';

@Component({
  selector: 'rdr-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends DataSourceTemplateBaseComponent<NewsData> {

  defaultTemplateInfo: DataSourceTemplateInfo = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    source: '',
    attributes: {
      height: '592px'
    }
  };

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

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }


  cardNewsData(item): CardNewsData {
    return {
      url: item.url,
      date: item.start_date,
      title: item.title,
      content: ''
    };
  }
}
