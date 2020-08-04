import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/layout-base/data-source-template-base.component';
import { DownloadData } from './download.interface';
import { DataSourceTemplateInfo } from '../../interface/data-source-template-info.interface';
import { DataSourceType } from '../../enum';

@Component({
  selector: 'rdr-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent extends DataSourceTemplateBaseComponent<DownloadData> {

  defaultTemplateInfo: DataSourceTemplateInfo = {
    id: '',
    templateId: 'Download',
    fields: [],
    source: '',
    attributes: {
      height: '592px'
    }
  };

  sourceType = DataSourceType.Download;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }



}
