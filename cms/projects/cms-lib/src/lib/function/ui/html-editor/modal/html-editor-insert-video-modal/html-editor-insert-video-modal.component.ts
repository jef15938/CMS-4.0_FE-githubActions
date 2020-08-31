import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, CustomModalActionButton, ModalService } from '../../../modal';
import { YoutubeUtil } from '../../service/youtube-util';
import { NgModel, FormControl } from '@angular/forms';

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
    this.close({
      src,
      frameId: this.frameIdControl.value || '',
    });
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
