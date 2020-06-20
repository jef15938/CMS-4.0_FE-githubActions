import { Component, OnInit } from '@angular/core';
import { CustomCellRenderer, CmsTable } from './../../../../../../ui/table/table.interface';
import { GalleryInfo } from './../../../../../../neuxAPI/bean/GalleryInfo';

@Component({
  selector: 'cms-gallery-info-cell',
  templateUrl: './gallery-info-cell.component.html',
  styleUrls: ['./gallery-info-cell.component.scss']
})
export class GalleryInfoCellComponent implements CustomCellRenderer, OnInit {

  readonly galleryShowUrl = 'https://cms.decoder.com.tw/Gallery/Show';

  config: { data: GalleryInfo, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: GalleryInfo, table: CmsTable }) {
    this.config = config;
  }

}
