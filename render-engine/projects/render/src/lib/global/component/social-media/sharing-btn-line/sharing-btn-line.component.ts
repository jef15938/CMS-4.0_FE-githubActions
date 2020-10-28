import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SharingBtnBase } from '../sharing-btn-base/sharing-btn-base.component';

const SDK_CONTAINER_ID = 'neux-render-cdk-container-line';
const SDK_SRC = 'https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js';

@Component({
  selector: 'rdr-sharing-btn-line',
  templateUrl: './sharing-btn-line.component.html',
  styleUrls: ['./sharing-btn-line.component.scss']
})
export class SharingBtnLineComponent extends SharingBtnBase {
  @ViewChild('SDK') sdkContainer: ElementRef<HTMLDivElement>;

  @Input() dataType: 'a' | 'b' | 'c' = 'a';
  @Input() dataColor: 'default' | 'grey' = 'default';
  @Input() dataCount = true;
  @Input() dataSize: 'small' | 'large' = 'small';

  includeSdk() {
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

  loadButton() {
    const lineIt = (window as any).LineIt;
    lineIt?.loadButton();
    return of(undefined);
  }

}
