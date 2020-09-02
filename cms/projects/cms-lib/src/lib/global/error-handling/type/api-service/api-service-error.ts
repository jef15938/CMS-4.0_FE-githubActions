import { CmsError } from '../core/base-error';

export class CmsApiServiceError extends CmsError {
  constructor(config?: { name?: string, message?: string, description?: string }) {
    super(CmsApiServiceError);
    this.config({
      code: 1000,
      name: config?.name || 'CmsApiServiceError',
      message: config?.message || 'API 呼叫錯誤',
      description: config?.description || 'API 呼叫錯誤',
    });
  }
}
