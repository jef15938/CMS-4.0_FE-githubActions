import { Component, OnInit, Inject } from '@angular/core';
import { CustomCellRenderer, CmsTable } from '../../../../ui/table';
import { CMS_ENVIROMENT_TOKEN } from '../../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../../global/interface';
import { GalleryInfoModel } from '../../../../../global/api/data-model/models/gallery-info.model';

@Component({
  selector: 'cms-gallery-info-cell',
  templateUrl: './gallery-info-cell.component.html',
  styleUrls: ['./gallery-info-cell.component.scss']
})
export class GalleryInfoCellComponent implements CustomCellRenderer, OnInit {

  config: { data: GalleryInfoModel, table: CmsTable };

  constructor(
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
  ) { }

  ngOnInit(): void {
  }

  compInit(config: { data: GalleryInfoModel, table: CmsTable }) {
    this.config = config;
  }

}
