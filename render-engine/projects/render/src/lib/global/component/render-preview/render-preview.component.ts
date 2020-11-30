import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewCommandType } from '../../enum/preview-command.enum';
import { PreviewCommand, PreviewCommandData } from '../../interface/preview-command.interface';

enum PreviewSize {
  PC = 'preview-size-pc',
  PAD_H = 'preview-size-1024-768',
  PAD_V = 'preview-size-768-1024',
  MOBILE = 'preview-size-375-667',
}

@Component({
  selector: 'rdr-render-preview',
  templateUrl: './render-preview.component.html',
  styleUrls: ['./render-preview.component.scss'],
})
export class RenderPreviewComponent implements OnInit {

  @ViewChild('IFrame') iframe: ElementRef<HTMLIFrameElement>;

  func = {
    compare: {
      on: false,
    }
  };

  PreviewSize = PreviewSize;
  previewSize: PreviewSize = PreviewSize.PC;

  iframeUrl = '';

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // route 跳轉時, replace 當前的 url 後 assign 給 iframe
    this.activatedRoute.params.subscribe(params => {
      this.iframeUrl = window.location.href.replace('/preview/', '/preview/iframe/');
    });


    // 當自己是 iframe, 接到父層的 postMessage 要做什麼
    window.onmessage = (e) => {
      const command: PreviewCommand<PreviewCommandData> = e.data;
      switch (command.type) {
        case PreviewCommandType.COMPARE_ON:
          this.func.compare.on = true;
          break;
        case PreviewCommandType.COMPARE_OFF:
          this.func.compare.on = false;
          break;
        case PreviewCommandType.LINK:
          {
            if (!command.data.target) {
              window.location.href = command.data.href;
            } else {
              window.open(command.data.href, '_blank');
            }
          }
      }

    };
  }

  /**
   *
   * 用 postMessage 方式與 iframe 互動
   * @private
   * @param {PreviewCommand<PreviewCommandData>} command
   * @memberof RenderPreviewComponent
   */
  private sendCommandToIFrame(command: PreviewCommand<PreviewCommandData>) {
    this.iframe?.nativeElement?.contentWindow?.postMessage(command, '*');
  }


  /**
   *
   * 點擊比較版本／取消比較
   * @memberof RenderPreviewComponent
   */
  toggleCompare() {
    this.previewSize = PreviewSize.PC;
    const command: PreviewCommand<null> = { type: PreviewCommandType.COMPARE_TOGGLE, data: null };
    this.sendCommandToIFrame(command);
  }


  /**
   *
   * 設定 preview size (PC/PAD_H/PAD_V/MOBILE)
   * @param {PreviewSize} previewSize
   * @memberof RenderPreviewComponent
   */
  setPreviewSize(previewSize: PreviewSize) {
    this.closeCompare();
    this.previewSize = previewSize;
  }


  /**
   *
   * 關閉比較版本的頁面
   * @memberof RenderPreviewComponent
   */
  closeCompare() {
    this.func.compare.on = false;
    const command: PreviewCommand<null> = { type: PreviewCommandType.COMPARE_OFF, data: null };
    this.sendCommandToIFrame(command);
  }

}
