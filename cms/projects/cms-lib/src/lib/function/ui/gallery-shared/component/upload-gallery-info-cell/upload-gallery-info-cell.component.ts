import { Component, OnInit, Inject } from '@angular/core';
import { CustomCellRenderer, CmsTable } from '../../../../ui/table';
import { CMS_ENVIROMENT_TOKEN } from '../../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../../global/interface';
import { FileUploadModel } from '../../../../../global/api/service';

@Component({
  selector: 'cms-gallery-info-cell',
  templateUrl: './upload-gallery-info-cell.component.html',
  styleUrls: ['./upload-gallery-info-cell.component.scss']
})
export class UploadGalleryInfoCellComponent implements CustomCellRenderer, OnInit {

  config: { data: FileUploadModel, table: CmsTable };

  constructor(
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
  ) { }

  ngOnInit(): void {
  }

  compInit(config: { data: FileUploadModel, table: CmsTable }) {
    this.config = config;
  }

}
