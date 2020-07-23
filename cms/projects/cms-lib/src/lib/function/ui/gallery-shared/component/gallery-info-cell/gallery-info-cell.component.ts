import { Component, OnInit } from '@angular/core';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';
import { CustomCellRenderer, CmsTable } from '../../../../ui/table';

@Component({
  selector: 'cms-gallery-info-cell',
  templateUrl: './gallery-info-cell.component.html',
  styleUrls: ['./gallery-info-cell.component.scss']
})
export class GalleryInfoCellComponent implements CustomCellRenderer, OnInit {

  config: { data: GalleryInfo, table: CmsTable };

  constructor() { }

  ngOnInit(): void {
  }

  compInit(config: { data: GalleryInfo, table: CmsTable }) {
    this.config = config;
  }

}
