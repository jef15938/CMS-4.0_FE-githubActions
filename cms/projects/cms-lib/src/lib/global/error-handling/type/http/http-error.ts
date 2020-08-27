import { CmsError } from '../core/base-error';

export class HttpError extends CmsError {
  constructor() {
    super();
    this.config({
      code: 400,
      name: 'HttpError',
      message: 'HttpError',
      title: 'HttpError',
      description: 'HttpError',
    });
  }
}

export class HttpExceptionError extends CmsError {
  constructor() {
    super();
    this.config({
      code: 500,
      name: 'HttpExceptionError',
      message: 'HttpExceptionError',
      title: 'HttpExceptionError',
      description: 'HttpExceptionError',
    });
  }
}
