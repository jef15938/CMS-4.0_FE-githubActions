import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LayoutFieldImgDirective, ImgFieldInfo } from '@neux/render';
import { GallerySharedService } from './../../../../../../../../function/ui/gallery-shared/service/gallery-shared.service';
import { ATTRIBUTE_GALLERY_ID } from '../../../../../../html-editor/const/html-editor-container.const';

@Component({
  selector: 'cms-field-control-img',
  templateUrl: './field-control-img.component.html',
  styleUrls: ['./field-control-img.component.scss']
})
export class FieldControlImgComponent extends ContentControlBase implements OnInit, OnChanges {

  ATTRIBUTE_GALLERY_ID = ATTRIBUTE_GALLERY_ID;
  fieldInfo: ImgFieldInfo;

  adviceFormat = '';
  adviceWidth = 0;
  adviceHeight = 0;

  constructor(
    private gallerySharedService: GallerySharedService,
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
      this.adviceWidth = directive.adviceWidth || 0;
      this.adviceHeight = directive.adviceHeight || 0;
      this.fieldInfo = selected.fieldInfo as ImgFieldInfo;
      this.fieldInfo.extension = this.fieldInfo.extension || {
        altValue: '',
        galleryName: '',
      };
    }
  }

  selectImage() {
    const galleryID = this.fieldInfo.extension[ATTRIBUTE_GALLERY_ID];
    const galleryName = this.fieldInfo.extension.galleryName;
    const imageHeightWidth = this.adviceWidth > 0 && this.adviceHeight > 0
      ? { width: this.adviceWidth, height: this.adviceHeight }
      : null;

    (
      galleryID
        ? this.gallerySharedService.updateGalleryImage(
          `${galleryID}`,
          galleryName,
          galleryName.substring(galleryName.lastIndexOf('.') + 1),
          imageHeightWidth,
        )
        : this.gallerySharedService.addGalleryImage('', imageHeightWidth)
    ).subscribe(res => {
      if (res) {
        const saved = res as any;
        this.fieldInfo.fieldVal = saved.path;
        this.fieldInfo.extension[ATTRIBUTE_GALLERY_ID] = `${saved.galleryId}`;
        this.fieldInfo.extension.galleryName = saved.galleryName;
        this.change.emit();
      }
    });
  }

}
