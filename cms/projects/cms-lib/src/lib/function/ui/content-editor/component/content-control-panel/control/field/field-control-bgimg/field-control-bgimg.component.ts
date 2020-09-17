import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LayoutFieldBgimgDirective } from '@neux/render';
import { GallerySharedService } from '../../../../../../gallery-shared/service/gallery-shared.service';
import { ATTRIBUTE_GALLERY_ID } from '../../../../../../html-editor/const/html-editor-container.const';
import { ContentFieldInfoModel } from '../../../../../../../../global/api/data-model/models/content-field-info.model';

@Component({
  selector: 'cms-field-control-bgimg',
  templateUrl: './field-control-bgimg.component.html',
  styleUrls: ['./field-control-bgimg.component.scss']
})
export class FieldControlBgimgComponent extends ContentControlBase implements OnInit, OnChanges {

  ATTRIBUTE_GALLERY_ID = ATTRIBUTE_GALLERY_ID;

  fieldInfo: ContentFieldInfoModel;

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
      const directive = selected.fieldDirective as LayoutFieldBgimgDirective;
      this.fieldInfo = selected.fieldInfo;
      this.adviceFormat = directive.adviceFormat;
      this.adviceWidth = directive.adviceWidth;
      this.adviceHeight = directive.adviceHeight;
    }
  }

  selectImage() {
    const galleryID = this.fieldInfo.extension[ATTRIBUTE_GALLERY_ID];
    const path = this.fieldInfo.fieldVal;
    const galleryName = this.fieldInfo.extension.galleryName;
    const originID = this.fieldInfo.extension.originID;
    const originPath = this.fieldInfo.extension.originPath;
    const imageHeightWidth = this.adviceWidth > 0 && this.adviceHeight > 0
      ? { width: this.adviceWidth, height: this.adviceHeight }
      : null;

    (
      galleryID
        ? this.gallerySharedService.updateGalleryImage(
          `${galleryID}`,
          galleryName,
          path.substring(path.lastIndexOf('.') + 1),
          `${originID}`,
          originPath,
          path,
          imageHeightWidth
        )
        : this.gallerySharedService.addGalleryImage()
    ).subscribe(res => {
      if (res) {
        const saved = res as any;
        this.fieldInfo.fieldVal = saved.path;
        this.fieldInfo.extension[ATTRIBUTE_GALLERY_ID] = `${saved.galleryId}`;
        this.fieldInfo.extension.galleryName = saved.galleryName;
        this.fieldInfo.extension.originID = saved.originalGalleryId;
        this.fieldInfo.extension.originPath = saved.originalPath;
        this.change.emit();
      }
    });
  }

}
