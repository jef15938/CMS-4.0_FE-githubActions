import { Component, Input } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { take, takeUntil, retryWhen, delay } from 'rxjs/operators';
import { SharingBtnBase } from '../sharing-btn-base/sharing-btn-base.component';

const SDK_CONTAINER_ID = 'neux-render-sdk-container-fb';
const SDK_SRC = 'https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v8.0';

@Component({
  selector: 'rdr-sharing-btn-fb',
  templateUrl: './sharing-btn-fb.component.html',
  styleUrls: ['./sharing-btn-fb.component.scss']
})
export class SharingBtnFbComponent extends SharingBtnBase {

  @Input() dataSize: 'small' | 'large' = 'small';
  @Input() dataLayout: 'box_count' | 'button_count' | 'button' = 'button_count';
  @Input() btnText = '分享';

  includeSdk() {

    let container = this.document.getElementById(SDK_CONTAINER_ID);
    if (container) { return of(undefined); }

    const subject = new Subject();

    container = this.document.createElement('div');
    container.id = SDK_CONTAINER_ID;

    const fbRoot = this.document.createElement('div');
    fbRoot.id = 'fb-root';
    const script = this.document.createElement('script');
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.src = SDK_SRC;

    script.onload = (res) => {
      subject.next(undefined);
      subject.complete();
      subject.unsubscribe();
    };

    script.onerror = (err) => {
      subject.error('FB sdk load error');
      subject.complete();
      subject.unsubscribe();
    };

    container.appendChild(fbRoot);
    container.appendChild(script);

    this.document.body.insertBefore(container, this.document.body.firstElementChild);

    return subject.pipe(take(1));
  }

  loadButton() {
    this.excuteFbReload().pipe(
      retryWhen(errors => errors.pipe(delay(100), take(10))),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  private excuteFbReload() {
    const fb = (window as any)?.FB;
    if (fb) {
      fb.XFBML.parse();
      return of(undefined);
    } else {
      return throwError('no fb sdk');
    }
  }

}
