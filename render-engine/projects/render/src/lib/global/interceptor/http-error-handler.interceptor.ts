
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpUtil } from '../utils/http-util';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          HttpUtil.checkErrorResponse(res);
        }
      }),
    );
  }
}
