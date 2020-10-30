import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'rdr-sharing-btn-url',
  templateUrl: './sharing-btn-url.component.html',
  styleUrls: ['./sharing-btn-url.component.scss']
})
export class SharingBtnUrlComponent {

  readonly clipBoardInputId = 'gallerySharedClipBoardInput';

  constructor(
    private elementRef: ElementRef,
  ) { }

  onBtnClick() {
    const url = window.location.href;
    this.copyToClipBoard(url);
  }

  private copyToClipBoard(text: string) {
    const input = (this.elementRef.nativeElement as HTMLElement).querySelector(`#${this.clipBoardInputId}`) as HTMLInputElement;
    input.setAttribute('type', 'text');
    input.setAttribute('value', text);
    input.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      alert('複製成功，請直接貼上使用!!');
    } catch (err) {
      alert('無法複製到剪貼板');
    }

    input.setAttribute('type', 'hidden');
    input.setAttribute('value', '');
    /* unselect the range */
    window.getSelection().removeAllRanges();
  }
}
