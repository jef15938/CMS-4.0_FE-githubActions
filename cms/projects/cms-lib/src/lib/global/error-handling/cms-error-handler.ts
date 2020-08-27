import { ErrorHandler } from '@angular/core';
import { CmsError } from './type/core/base-error';

export class CmsErrorHandler implements ErrorHandler {

  static throwError<T extends CmsError>(
    catchedError: any,
    cmsError: T,
  ) {
    cmsError.addMessage(catchedError.message).addStack(catchedError.stack);
    throw cmsError;
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
