import { Component } from '@angular/core';
import { RichContentType, RichContent } from './../../../../../../service/dialog-flow.service';
import { RichContentModalComponent } from '../rich-content-modal-base';

interface DescriptionContent extends RichContent {
  type: RichContentType.DESCRIPTION;
  title: string;
  text: string[];
}

@Component({
  selector: 'cms-description-content-modal',
  templateUrl: './description-content-modal.component.html',
  styleUrls: ['./description-content-modal.component.scss']
})
export class DescriptionContentModalComponent extends RichContentModalComponent<DescriptionContent> {

  title = '描述';

  newText = '';

  createNewModel(): DescriptionContent {
    return {
      type: RichContentType.DESCRIPTION,
      title: '',
      text: [],
    }
  }

  addText() {
    const newText = (this.newText || '').trim();
    if (!newText) { return; }
    if (this.contentModel.text.indexOf(newText) < 0) {
      this.contentModel.text.push(newText);
    } else {
      alert('已有同樣的同義祠');
    }
    this.newText = '';
  }

  removeText(text: string) {
    text = (text || '').trim();
    if (!text) { return; }
    const index = this.contentModel.text.indexOf(text);
    if (index > -1) {
      this.contentModel.text.splice(index, 1);
    }
  }

}
