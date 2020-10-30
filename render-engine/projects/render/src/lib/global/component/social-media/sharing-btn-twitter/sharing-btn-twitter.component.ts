import { Component, Input } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { take, retryWhen, delay, takeUntil } from 'rxjs/operators';
import { SharingBtnBase } from '../sharing-btn-base/sharing-btn-base.component';

const SDK_CONTAINER_ID = 'neux-render-cdk-container-twitter';

@Component({
  selector: 'rdr-sharing-btn-twitter',
  templateUrl: './sharing-btn-twitter.component.html',
  styleUrls: ['./sharing-btn-twitter.component.scss']
})
export class SharingBtnTwitterComponent extends SharingBtnBase {

  @Input() btnText = 'Tweet';
  @Input() dataSize: 'default' | 'large' = 'default';
  @Input() defautText = '';

  includeSdk() {
    const existContainer = this.document.getElementById(SDK_CONTAINER_ID);
    if (existContainer) { return of(undefined); }
    const container = this.document.createElement('div');
    container.id = SDK_CONTAINER_ID;

    const script = this.document.createElement('script');
    script.innerHTML = this.generateScriptString();

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

  private generateScriptString() {
    return `window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};

      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    }(document, "script", "twitter-wjs"));

    twttr.ready(function (twttr) {
      twttr.events.bind(
        'loaded',
        function (event) {
          // console.warn('twttr loaded', twttr, event)
        }
      );
    });
    `;
  }

  loadButton() {
    return this.excuteFbReload().pipe(
      retryWhen(errors => errors.pipe(delay(100), take(10))),
      takeUntil(this.destroy$),
    );
  }

  private excuteFbReload() {
    const twttr = (window as any)?.twttr;
    if (twttr) {
      twttr.widgets.load();
      return of(undefined);
    } else {
      return throwError('no twitter sdk');
    }
  }

}
