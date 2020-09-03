import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, NEVER, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CmsHttpCancelService } from '../service/cms-http-cancel.service';
import { Cms } from '../service';

// https://weblog.west-wind.com/posts/2019/Apr/07/Creating-a-custom-HttpInterceptor-to-handle-withCredentials
@Injectable({ providedIn: 'root' })
export class WithCredentialsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req);
  }

}

@Injectable()
export class HttpError401Interceptor implements HttpInterceptor {

  constructor(
    private cms: Cms,
    private cmsHttpCancelService: CmsHttpCancelService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.cmsHttpCancelService.cancelPendingRequests();
          this.cms.setAuthorized(false);
        }
        return throwError(error);
      })
    );
  }
}

@Injectable()
export class ManageHttpInterceptor implements HttpInterceptor {

  constructor(
    private cmsHttpCancelService: CmsHttpCancelService,
  ) { }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(takeUntil(this.cmsHttpCancelService.onCancelPendingRequests()));
  }
}
