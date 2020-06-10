import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal/custom-modal-base';
import { ModalService } from '../../../modal/modal.service';

const YOUTUBE_EMBED_VIDEO_URL = 'https://www.youtube.com/embed/';
const YOUTUBE_EMBED_IMAGE_URL = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};

@Component({
  selector: 'cms-html-editor-insert-video-modal',
  templateUrl: './html-editor-insert-video-modal.component.html',
  styleUrls: ['./html-editor-insert-video-modal.component.scss']
})
export class HtmlEditorInsertVideoModalComponent extends CustomModalBase implements OnInit {

  @ViewChild('Img') img: ElementRef<HTMLImageElement>;

  title = '';
  actions: CustomModalActionButton[];

  @Input() src = '';
  @Input() frame_id = '';

  isValidSrc = true;

  constructor(
    private _modalService: ModalService,
  ) { super(); }

  ngOnInit(): void {
    this.src = this.src || '';
  }

  confirm() {
    const src = this.checkSrc();
    if (!src) { this._modalService.openMessage({ message: 'Youtube 網址錯誤' }); return; }
    this.close({
      src: src,
      frame_id: this.frame_id || '',
    })
  }

  checkSrc() {
    const frameId = this.frame_id;
    if (this.frame_id.indexOf(YOUTUBE_EMBED_VIDEO_URL) > -1) {
      const videoId = frameId.replace(YOUTUBE_EMBED_VIDEO_URL, '');
      this.isValidSrc = true;
      return YOUTUBE_EMBED_IMAGE_URL(videoId);
    }
    this.isValidSrc = false;
  }

}
