import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LayoutFieldImgDirective, ImgFieldInfo } from 'render';
import { GallerySharedService } from './../../../../../../../../function/ui/gallery-shared/service/gallery-shared.service';
import { GalleryInfo } from '../../../../../../../../global/api/neuxAPI/bean/GalleryInfo';
import { GalleryService } from '../../../../../../../../global/api/service/gallery/gallery.service';

@Component({
  selector: 'cms-field-control-img',
  templateUrl: './field-control-img.component.html',
  styleUrls: ['./field-control-img.component.scss']
})
export class FieldControlImgComponent extends ContentControlBase implements OnInit, OnChanges {

  fieldInfo: ImgFieldInfo;

  adviceFormat = '';
  adviceWidth = 0;
  adviceHeight = 0;

  constructor(
    private gallerySharedService: GallerySharedService,
    private galleryService: GalleryService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const selected = changes.selected.currentValue as TemplateFieldSelectEvent;
      const directive = selected.fieldDirective as LayoutFieldImgDirective;
      this.adviceFormat = directive.adviceFormat;
      this.adviceWidth = directive.adviceWidth;
      this.adviceHeight = directive.adviceHeight;
      this.fieldInfo = selected.fieldInfo as ImgFieldInfo;
      this.fieldInfo.extension = this.fieldInfo.extension || {
        altValue: ''
      };
    }
  }

  changeGallery() {
    this.gallerySharedService.openGallery().subscribe((selectedGallery: GalleryInfo) => {
      if (selectedGallery) {
        this.fieldInfo.fieldVal = this.galleryService.getGalleryShowUrlByGalleryID(selectedGallery.gallery_id);
        this.change.emit();
      }
    });
  }

}
