import { Component, OnInit, Inject, Input, PLATFORM_ID, Optional } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RENDERED_PAGE_ENVIRONMENT_ROKEN } from '../../../injection-token/injection-token';
import { RenderedPageEnvironment } from '../../../interface/page-environment.interface';

const SDK_CONTAINER_ID = 'neux-render-sdk-container-fb';
const SDK_SRC = 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v8.0';

@Component({
  selector: 'rdr-sharing-btn-fb',
  templateUrl: './sharing-btn-fb.component.html',
  styleUrls: ['./sharing-btn-fb.component.scss']
})
export class SharingBtnFbComponent implements OnInit {

  @Input() sharedUrl = '';
  @Input() dataSize: 'small' | 'large' = 'small';
  @Input() dataLayout: 'box_count' | 'button_count' | 'button' = 'button_count';
  @Input() btnText = '分享';

  @Input() useCurrentUrlAsSharedUrl = true;

  private document: Document;

  constructor(
    @Inject(DOCUMENT) document: any,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(RENDERED_PAGE_ENVIRONMENT_ROKEN) @Optional() private pageEnv: RenderedPageEnvironment,
  ) {
    this.document = document;
  }

  ngOnInit(): void {
    this.includeSdk();
    this.checkSharedUrl();
  }

  private checkSharedUrl() {
    if (!this.useCurrentUrlAsSharedUrl) { return; }
    if (!isPlatformBrowser(this.platformId)) { return; }
    this.sharedUrl = window.location.href;
  }

  private includeSdk() {
    if (!isPlatformBrowser(this.platformId)) { return; }
    if (!this.document) { return; }

    const existContainer = this.document.getElementById(SDK_CONTAINER_ID);
    if (existContainer) { return; }
    const container = this.document.createElement('div');
    container.id = SDK_CONTAINER_ID;

    const fbRoot = this.document.createElement('div');
    fbRoot.id = 'fb-root';
    const script = this.document.createElement('script');
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src = SDK_SRC;

    container.appendChild(fbRoot);
    container.appendChild(script);

    this.document.body.insertBefore(container, this.document.body.firstElementChild);
  }

}
