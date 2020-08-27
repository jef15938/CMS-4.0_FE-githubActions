import { CmsError } from '../core/base-error';

export class CmsMediaError extends CmsError {
  constructor() {
    super();
    this.config({
      code: 1100,
      name: 'CmsMediaError',
      message: 'CmsMediaErrorMessage',
      title: 'CmsMediaErrorTitle',
      description: 'CmsMediaErrorDescription',
    });
  }
}
