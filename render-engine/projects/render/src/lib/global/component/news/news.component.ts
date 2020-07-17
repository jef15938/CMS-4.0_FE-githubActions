import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/layout-base/data-source-template-base.component';
import { NewsData } from './news.interface';
import { MOCK_NEWS_DATA } from './news.mock';

@Component({
  selector: 'rdr-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends DataSourceTemplateBaseComponent<NewsData> {

  constructor(
    injector: Injector,
  ) {
    super(injector, MOCK_NEWS_DATA);
  }

}
