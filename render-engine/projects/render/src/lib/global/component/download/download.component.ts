import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/template-base/data-source-template-base.component';
import { DataSourceTemplateInfo, DownloadData } from '../../interface/data-source.interface';

const TEMPLATE_ID = 'download';

@Component({
  selector: 'rdr-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent extends DataSourceTemplateBaseComponent<DownloadData> {

  defaultTemplateInfo: DataSourceTemplateInfo = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    source: '',
    attributes: {
      height: '592px'
    }
  };

  constructor(injector: Injector, ) { super(injector, TEMPLATE_ID); }



}
