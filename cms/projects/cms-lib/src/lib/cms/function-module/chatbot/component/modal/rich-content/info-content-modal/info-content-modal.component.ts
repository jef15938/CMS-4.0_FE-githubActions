import { Component } from '@angular/core';
import { RichContentType, RichContent } from './../../../../../../service/dialog-flow.service';
import { RichContentModalComponent } from '../rich-content-modal-base';

interface InfoContent extends RichContent {
  type: RichContentType.INFO;
  title: string;
  subtitle: string;
  image: {
    src: {
      rawUrl: string;
    }
  };
  actionLink: string;
}

@Component({
  selector: 'cms-info-content-modal',
  templateUrl: './info-content-modal.component.html',
  styleUrls: ['./info-content-modal.component.scss']
})
export class InfoContentModalComponent extends RichContentModalComponent<InfoContent> {

  title = '資訊';

  createNewModel(): InfoContent {
    return {
      type: RichContentType.INFO,
      title: '',
      subtitle: '',
      image: {
        src: {
          rawUrl: '',
        }
      },
      actionLink: '',
    };
  }

}
