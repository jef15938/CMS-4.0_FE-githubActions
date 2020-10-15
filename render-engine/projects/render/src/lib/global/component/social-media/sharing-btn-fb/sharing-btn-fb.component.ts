import { Component, OnInit, Inject, Input, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

const FB_CDK_CONTAINER_ID = 'neux-render-cdk-container-fb';
const FB_CDK_SRC = 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v8.0';

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
  ) {
    this.document = document;
  }

  ngOnInit(): void {
    this.includeFbCdk();
    this.checkSharedUrl();
  }

  private checkSharedUrl() {
    if (!this.useCurrentUrlAsSharedUrl) { return; }
    if (!isPlatformBrowser(this.platformId)) { return; }
    this.sharedUrl = window.location.href;
  }

  private includeFbCdk() {
    if (!this.document) { return; }
    const existCdkContainer = this.document.getElementById(FB_CDK_CONTAINER_ID);
    if (existCdkContainer) { return; }
    this.createCdkContainer();
  }

  private createCdkContainer() {
    const cdkContainer = this.document.createElement('div');
    cdkContainer.id = FB_CDK_CONTAINER_ID;

    const fbRoot = this.document.createElement('div');
    fbRoot.id = 'fb-root';
    const script = this.document.createElement('script');
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src = FB_CDK_SRC;

    cdkContainer.appendChild(fbRoot);
    cdkContainer.appendChild(script);

    this.document.body.insertBefore(cdkContainer, this.document.body.firstElementChild);
  }

}
