import { ErrorHandler } from '@angular/core';
import { CmsError } from './type/core/base-error';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpError } from '@neux/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CmsFunctionError } from './type/function/function-error';

interface ModalService {
  openMessage: (config: { message: string }) => Observable<any>;
}

export class CmsErrorHandler implements ErrorHandler {

  private static modalService: ModalService = null;

  private static showMessage(message: string) {
    if (CmsErrorHandler.modalService) {
      CmsErrorHandler.modalService.openMessage({ message }).subscribe();
    } else {
      alert(message);
    }
  }

  static registerModalService(modalService: ModalService) {
    this.modalService = modalService;
  }

  private static createError(catchedError: any, message: string, description?: string) {
    return new CmsFunctionError(message)
      .setDescription(description)
      .addMessage(catchedError.message)
      .addStack(catchedError.stack)
      ;
  }

  static throw(catchedError: any, message: string) {
    const errorToThrow = this.createError(catchedError, message);
    throw errorToThrow;
  }

  static throwAndShow(catchedError: any, message: string, description: string) {
    const errorToThrow = this.createError(catchedError, message, description);
    CmsErrorHandler.showMessage(errorToThrow.description);
    throw errorToThrow;
  }

  static handleError(catchedError: any);
  // tslint:disable-next-line: unified-signatures
  static handleError(catchedError: any, message: string);
  // tslint:disable-next-line: unified-signatures
  static handleError(catchedError: any, handler: (error, showMessage: (message?: string) => void) => any);
  static handleError(catchedError: any, arg?: any) {
    const showMessage = (m?: string) => {
      if (m) {
        CmsErrorHandler.showMessage(m);
        return;
      }

      let message = '程式執行錯誤';
      if (catchedError instanceof CmsError) {
        message = catchedError.description;
      }
      if (catchedError instanceof HttpError) {
        message = `${catchedError.message}`;
      }
      if (catchedError instanceof HttpErrorResponse) {
        message = `${catchedError.status} ${catchedError.error?.error_message || catchedError.message}`;
      }
      if (catchedError instanceof Error) {
        message = `${catchedError.message}`;
      }
      CmsErrorHandler.showMessage(message);
    };

    if (arg && typeof (arg) === 'function') {
      arg(catchedError, showMessage);
      throw catchedError;
    }

    if (arg && typeof (arg) === 'string') {
      CmsErrorHandler.showMessage(arg);
      throw catchedError;
    }

    showMessage();
    throw catchedError;
  }

  static rxHandleError<T>(): (ob: Observable<T>) => Observable<T>;
  // tslint:disable-next-line: unified-signatures
  static rxHandleError<T>(message: string): (ob: Observable<T>) => Observable<T>;
  // tslint:disable-next-line: unified-signatures
  static rxHandleError<T>(handler: (error, showMessage: (message?: string) => void) => any): (ob: Observable<T>) => Observable<T>;
  static rxHandleError<T>(arg?: any): (ob: Observable<T>) => Observable<T> {
    function func(ob: Observable<T>): Observable<T> {
      return ob.pipe(
        catchError(catchedError => {
          CmsErrorHandler.handleError(catchedError, arg);
          return throwError(catchedError);
        })
      );
    }
    return func;
  }

  static rxMapError<T, TError extends CmsError>(cmsError: TError, callBack?: (error) => any): (ob: Observable<T>) => Observable<T> {
    function func(ob: Observable<T>) {
      return ob.pipe(
        catchError(catchedError => {
          cmsError = cmsError.addMessage(catchedError.message).addStack(catchedError.stack || catchedError.message);

          if (catchedError instanceof HttpErrorResponse) {
            cmsError = cmsError
              .addMessage(catchedError.error?.error_message)
              .setDescription(catchedError.error?.error_message || catchedError.message);
          }

          if (catchedError.name === 'TimeoutError') {
            cmsError = cmsError
              .addMessage('Timeout has occurred')
              .setDescription('系統逾時');
          }

          if (callBack && typeof (callBack) === 'function') {
            callBack(catchedError);
          }
          return throwError(cmsError);
        })
      );
    }
    return func;
  }

  handleError(error) {
    if (error instanceof Error || error instanceof CmsError) {
      console.error(error.message);
      console.error(error.stack);
    } else {
      throw error;
    }
  }

}
