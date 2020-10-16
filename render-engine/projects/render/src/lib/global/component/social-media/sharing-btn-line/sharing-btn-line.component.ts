import { Component, OnInit, Inject, Input, PLATFORM_ID, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { of, Subject, NEVER } from 'rxjs';
import { take } from 'rxjs/operators';

const SDK_CONTAINER_ID = 'neux-render-cdk-container-line';
const SDK_SRC = 'https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js';

@Component({
  selector: 'rdr-sharing-btn-line',
  templateUrl: './sharing-btn-line.component.html',
  styleUrls: ['./sharing-btn-line.component.scss']
})
export class SharingBtnLineComponent implements OnInit, AfterViewInit {
  @ViewChild('SDK') sdkContainer: ElementRef<HTMLDivElement>;

  @Input() sharedUrl = '';
  @Input() dataType: 'a' | 'b' | 'c' = 'a';
  @Input() dataColor: 'default' | 'grey' = 'default';
  @Input() dataCount = true;
  @Input() dataSize: 'small' | 'large' = 'small';

  @Input() useCurrentUrlAsSharedUrl = true;

  private document: Document;

  constructor(
    @Inject(DOCUMENT) document: any,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.document = document;
  }

  ngOnInit(): void {
    this.checkSharedUrl();
  }

  ngAfterViewInit(): void {
    this.includeSdk().subscribe(_ => this.loadButton());
  }

  private checkSharedUrl() {
    if (!this.useCurrentUrlAsSharedUrl) { return; }
    if (!isPlatformBrowser(this.platformId)) { return; }
    this.sharedUrl = window.location.href;
  }

  private includeSdk() {
    if (!isPlatformBrowser(this.platformId)) { return NEVER; }
    const existContainer = this.document.getElementById(SDK_CONTAINER_ID);
    if (existContainer) { return of(undefined); }
    const container = this.document.createElement('div');
    container.id = SDK_CONTAINER_ID;

    const script = this.document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = SDK_SRC;

    const subject = new Subject();

    script.onload = (res) => {
      subject.next(undefined);
      subject.complete();
      subject.unsubscribe();
    };

    script.onerror = (err) => {
      subject.error('line sdk load error');
      subject.complete();
      subject.unsubscribe();
    };

    container.appendChild(script);

    this.document.body.insertBefore(container, this.document.body.firstElementChild);

    return subject.pipe(take(1));
  }

  private loadButton() {
    (window as any).LineIt?.loadButton();
  }

}
