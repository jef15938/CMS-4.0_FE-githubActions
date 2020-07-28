import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, NEVER, throwError } from 'rxjs';
import { AuthorizationService } from '../api/service';
import { Router } from '@angular/router';
import { catchError, concatMap } from 'rxjs/operators';
import { ModalService } from '../../function/ui';

// https://weblog.west-wind.com/posts/2019/Apr/07/Creating-a-custom-HttpInterceptor-to-handle-withCredentials
@Injectable({
  providedIn: 'root'
})
export class WithCredentialsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });
    return next.handle(req);
  }

}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private modalService: ModalService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400) {
          const message = error?.error?.error_message;
          this.showLogoutMessage(message).subscribe();
          return NEVER;
        } else {
          return throwError(error);
        }
      })
    );
  }

  private showLogoutMessage(message: string) {
    return this.modalService.openMessage({ message });
  }

}


@Injectable()
export class HttpError401Interceptor implements HttpInterceptor {

  private isLogouting = false;

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private modalService: ModalService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.router.url !== '/login' && !this.isLogouting) {
            this.isLogouting = true;
            this.showLogoutMessage()
              .pipe(concatMap(_ => this.authorizationService.logout()))
              .subscribe(_ => this.isLogouting = false);
          }
          return NEVER;
        } else {
          return throwError(error);
        }
      })
    );
  }

  private showLogoutMessage() {
    return this.modalService.openMessage({ message: '授權時間已到，請重新登入' });
  }

}