import { ErrorHandler } from '@angular/core';
import { CmsError } from './type/core/base-error';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpError } from '@neux/core';
import { HttpErrorResponse } from '@angular/common/http';

export class CmsErrorHandler implements ErrorHandler {

  static throw<T extends CmsError>(catchedError: any, cmsError?: T) {
    if (cmsError) {
      cmsError.addMessage(catchedError.message).addStack(catchedError.stack);
    }
    throw cmsError || catchedError;
  }

  static handle(catchedError: any);
  // tslint:disable-next-line: unified-signatures
  static handle(catchedError: any, message: string);
  // tslint:disable-next-line: unified-signatures
  static handle(catchedError: any, handler: (error) => any);
  static handle(catchedError: any, arg?: any) {
    if (arg && typeof (arg) === 'function') {
      arg(catchedError);
      throw catchedError;
    }

    if (arg && typeof (arg) === 'string') {
      alert(arg);
      throw catchedError;
    }

    let message = '程式執行錯誤';
    if (catchedError instanceof CmsError) {
      message = catchedError.description;
    }
    if (catchedError instanceof HttpError) {
      message = `${catchedError.message}`;
    }
    if (catchedError instanceof HttpErrorResponse) {
      message = `${catchedError.status} ${catchedError.message}`;
    }
    if (catchedError instanceof Error) {
      message = `${catchedError.message}`;
    }
    alert(message);
    throw catchedError;
  }

  static rxHandleError();
  // tslint:disable-next-line: unified-signatures
  static rxHandleError(message: string);
  // tslint:disable-next-line: unified-signatures
  static rxHandleError(handler: (error) => any);
  static rxHandleError(arg?: any) {
    function func(ob: Observable<any>) {
      return ob.pipe(
        catchError(catchedError => {
          CmsErrorHandler.handle(catchedError, arg);
          return throwError(catchedError);
        })
      );
    }
    return func;
  }

  static rxMapError<T extends CmsError>(cmsError: T, callBack?: (error) => any) {
    function func(ob: Observable<any>) {
      return ob.pipe(
        catchError(catchedError => {
          cmsError.addMessage(catchedError.message).addStack(catchedError.stack);
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
