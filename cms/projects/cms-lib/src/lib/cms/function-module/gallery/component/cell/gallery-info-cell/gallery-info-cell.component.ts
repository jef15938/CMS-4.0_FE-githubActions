import { Component, OnInit, Inject } from '@angular/core';
import { CMS_ENVIROMENT, CmsEnviroment } from '@cms-lib/type';
import { GalleryInfo } from '@cms-lib/neuxAPI/bean/GalleryInfo';
import { CustomCellRenderer, CmsTable } from '@cms-lib/ui/table';

@Component({
  selector: 'cms-gallery-info-cell',
  templateUrl: './gallery-info-cell.component.html',
  styleUrls: ['./gallery-info-cell.component.scss']
})
export class GalleryInfoCellComponent implements CustomCellRenderer, OnInit {

  galleryShowUrl = '';

  config: { data: GalleryInfo, table: CmsTable };

  constructor(
    @Inject(CMS_ENVIROMENT) environment: CmsEnviroment,
  ) {
    this.galleryShowUrl = `${environment.apiBaseUrl}/Gallery/Show`;
  }

  ngOnInit(): void {
  }

  compInit(config: { data: GalleryInfo, table: CmsTable }) {
    this.config = config;
  }

}
