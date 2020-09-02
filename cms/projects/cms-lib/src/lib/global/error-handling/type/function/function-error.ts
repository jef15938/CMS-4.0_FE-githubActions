import { CmsError } from '../core/base-error';

export class CmsFunctionError extends CmsError {
  constructor(error?: string) {
    super();
    this.config({
      code: 1100,
      name: 'CmsFunctionError',
      message: error || '媒體操作系統錯誤',
      description: error || '媒體操作系統錯誤',
    });
  }
}
