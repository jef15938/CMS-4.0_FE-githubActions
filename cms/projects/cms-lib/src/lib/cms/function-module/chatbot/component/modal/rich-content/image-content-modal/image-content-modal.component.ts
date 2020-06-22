import { Component } from '@angular/core';
import { RichContentType, RichContent } from '@cms-lib/cms/service';
import { RichContentModalComponent } from '../rich-content-modal-base';

interface ImageContent extends RichContent {
  type: RichContentType.IMAGE;
  rawUrl: string;
  accessibilityText: string;
}

@Component({
  selector: 'cms-image-content-modal',
  templateUrl: './image-content-modal.component.html',
  styleUrls: ['./image-content-modal.component.scss']
})
export class ImageContentModalComponent extends RichContentModalComponent<ImageContent> {

  title = '圖片';

  createNewModel(): ImageContent {
    return {
      type: RichContentType.IMAGE,
      rawUrl: '',
      accessibilityText: '',
    };
  }

}
