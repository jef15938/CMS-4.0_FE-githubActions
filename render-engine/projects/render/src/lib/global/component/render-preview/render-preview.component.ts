import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewCommandType } from '../../enum/preview-command.enum';
import { PreviewCommand, PreviewCommandData } from '../../interface';

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
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const languageID = params.languageID;
      const pageID = params.pageID;
      const origin = window.location.origin;
      this.iframeUrl = `${origin}/preview/iframe/${languageID}/${pageID}`;
    });

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
            }
          }
      }

    };
  }

  private sendCommandToIFrame(command: PreviewCommandType) {
    this.iframe?.nativeElement?.contentWindow?.postMessage(command, '*');
  }

  toggleCompare() {
    this.previewSize = PreviewSize.PC;
    this.sendCommandToIFrame(PreviewCommandType.COMPARE_TOGGLE);
  }

  setPreviewSize(previewSize: PreviewSize) {
    this.closeCompare();
    this.previewSize = previewSize;
  }

  closeCompare() {
    this.func.compare.on = false;
    this.sendCommandToIFrame(PreviewCommandType.COMPARE_OFF);
  }

}
