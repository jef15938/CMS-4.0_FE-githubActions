import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/layout-base/data-source-template-base.component';
import { NewsData } from './news.interface';
import { MOCK_NEWS_DATA } from './news.mock';
import { DataSourceTemplateInfo } from '../../interface/data-source-template-info.interface';

@Component({
  selector: 'rdr-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends DataSourceTemplateBaseComponent<NewsData> {

  defaultTemplateInfo: DataSourceTemplateInfo = {
    id: '',
    templateId: 'News',
    fields: [],
    source: '',
    attributes: {
      height: '592px'
    }
  };

  sourceType = 'news';

  constructor(
    injector: Injector,
  ) {
    super(injector, MOCK_NEWS_DATA);
  }

}
