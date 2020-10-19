import { CmsError } from '../core/base-error';

export class CmsFunctionError extends CmsError {
  constructor(error?: string) {
    super();
    this.config({
      code: 2000,
      name: 'CmsFunctionError',
      message: error || '系統錯誤',
      description: error || '系統錯誤',
    });
  }
}
