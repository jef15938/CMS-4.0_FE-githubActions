import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, CustomModalActionButton, ModalService } from '../../../modal';
import { YoutubeUtil } from '../../service/youtube-util';

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
  @Input() frameId = '';

  isValidSrc = true;

  constructor(
    private modalService: ModalService,
  ) { super(); }

  ngOnInit(): void {
    this.src = this.src || '';
  }

  confirm() {
    this.isValidSrc = true;
    const src = this.checkSrc();
    if (!src) {
      this.modalService.openMessage({ message: 'Youtube 網址錯誤' });
      this.isValidSrc = false;
      return;
    }
    this.close({
      src,
      frameId: this.frameId || '',
    });
  }

  checkSrc() {
    const frameId = this.frameId;
    const videoId = YoutubeUtil.findVideoIdFromVideoUrl(frameId);
    return YoutubeUtil.getImageUrlFromVideoId(videoId);
  }

}
