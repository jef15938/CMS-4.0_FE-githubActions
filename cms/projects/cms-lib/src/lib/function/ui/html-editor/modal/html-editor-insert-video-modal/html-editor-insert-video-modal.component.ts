import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, ModalService } from '../../../modal';
import { YoutubeUtil } from '../../service/youtube-util';
import { FormControl } from '@angular/forms';

export interface HtmlEditorInsertVideoModalResponse {
  src: string;
  frameId: string;
}

@Component({
  selector: 'cms-html-editor-insert-video-modal',
  templateUrl: './html-editor-insert-video-modal.component.html',
  styleUrls: ['./html-editor-insert-video-modal.component.scss']
})
export class HtmlEditorInsertVideoModalComponent
  extends CustomModalBase<HtmlEditorInsertVideoModalComponent, HtmlEditorInsertVideoModalResponse>
  implements OnInit {

  YoutubeUtil = YoutubeUtil;

  @ViewChild('Img') img: ElementRef<HTMLImageElement>;

  title = '';

  @Input() src = '';
  @Input() frameId = '';
  frameIdControl = new FormControl('');

  constructor(
    private modalService: ModalService,
  ) { super(); }

  ngOnInit(): void {
    this.src = this.src || '';
    this.frameIdControl.setValidators(this.checkFrameIdValid.bind(this));
    this.frameIdControl.patchValue(this.frameId);
  }

  confirm() {
    const src = this.checkSrc();
    if (!src) {
      this.modalService.openMessage({ message: 'Youtube 網址錯誤' });
      return;
    }
    const videoId = YoutubeUtil.findVideoIdFromVideoUrl(this.frameIdControl.value);
    const frameId = YoutubeUtil.getEmbedUrl(videoId);
    this.close({ src, frameId });
  }

  checkFrameIdValid(control: FormControl) {
    if (!control.value) { return { required: true }; }
    if (
      control.value.indexOf('www.youtube.com/') < 0
      && control.value.indexOf('youtu.be/') < 0
    ) {
      return { invalid: true };
    }
    return null;
  }

  checkSrc() {
    if (!this.frameIdControl.value) { return ''; }
    const frameId = this.frameIdControl.value;
    const videoId = YoutubeUtil.findVideoIdFromVideoUrl(frameId);
    const imageUrl = YoutubeUtil.getImageUrlFromVideoId(videoId);
    return imageUrl;
  }

}
