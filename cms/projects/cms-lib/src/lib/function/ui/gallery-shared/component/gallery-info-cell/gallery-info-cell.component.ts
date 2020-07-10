import { Component, OnInit } from '@angular/core';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';
import { GalleryService } from '../../../../../global/api/service/gallery/gallery.service';
import { CustomCellRenderer, CmsTable } from '../../../../ui/table';

@Component({
  selector: 'cms-gallery-info-cell',
  templateUrl: './gallery-info-cell.component.html',
  styleUrls: ['./gallery-info-cell.component.scss']
})
export class GalleryInfoCellComponent implements CustomCellRenderer, OnInit {

  galleryShowUrl: string;

  config: { data: GalleryInfo, table: CmsTable };

  constructor(
    galleryService: GalleryService,
  ) {
    this.galleryShowUrl = galleryService.getGalleryShowUrl();
  }

  ngOnInit(): void {
  }

  compInit(config: { data: GalleryInfo, table: CmsTable }) {
    this.config = config;
  }

}
