import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LayoutFieldBgimgDirective, FieldInfo } from '@neux/render';
import { GallerySharedService } from '../../../../../../gallery-shared/service/gallery-shared.service';
import { ATTRIBUTE_GALLERY_ID } from '../../../../../../html-editor/const/html-editor-container.const';

@Component({
  selector: 'cms-field-control-bgimg',
  templateUrl: './field-control-bgimg.component.html',
  styleUrls: ['./field-control-bgimg.component.scss']
})
export class FieldControlBgimgComponent extends ContentControlBase implements OnInit, OnChanges {

  fieldInfo: FieldInfo;

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

  changeGallery() {
    this.gallerySharedService.openImgGallery().subscribe(selectedGallery => {
      if (selectedGallery) {
        this.fieldInfo.fieldVal = selectedGallery.url;
        this.fieldInfo.extension[ATTRIBUTE_GALLERY_ID] = `${selectedGallery.galleryId}`;
        this.change.emit();
      }
    });
  }

}
