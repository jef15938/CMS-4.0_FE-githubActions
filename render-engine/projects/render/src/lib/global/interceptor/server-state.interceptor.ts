import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpUtil } from '../utils/http-util';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

  readonly ignotCaches = [
    '/DataSource/', 'sitemap.json',
  ];

  constructor(private transferState: TransferState) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && !this.ignotCaches.some(s => req.url.indexOf(s) > -1)) {
          try {
            HttpUtil.checkErrorResponse(event);
            this.transferState.set(makeStateKey(req.url), event.body);
          } catch (error) {

          }
        }
      })
    );

  }

}
