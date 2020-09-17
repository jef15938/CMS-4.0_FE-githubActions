import { CmsError } from '../core/base-error';

export class CmsApiServiceError extends CmsError {
  constructor(childConstructor: new () => CmsApiServiceError, category: string, code: number) {
    super(childConstructor);
    this.config({
      code,
      name: `${childConstructor.name}`,
      message: `${category} Api 錯誤`,
      description: `${category} Api 錯誤`,
    });
  }
}

export class AuditingServiceError extends CmsApiServiceError {
  constructor() {
    super(AuditingServiceError, 'Auditing', 1010);
  }
}

export class AuthorizationServiceError extends CmsApiServiceError {
  constructor() {
    super(AuthorizationServiceError, 'Authorization', 1020);
  }
}

export class ContentServiceError extends CmsApiServiceError {
  constructor() {
    super(ContentServiceError, 'Content', 1030);
  }
}

export class DepartmentServiceError extends CmsApiServiceError {
  constructor() {
    super(DepartmentServiceError, 'Department', 1040);
  }
}

export class FarmServiceError extends CmsApiServiceError {
  constructor() {
    super(FarmServiceError, 'Farm', 1050);
  }
}

export class GalleryServiceError extends CmsApiServiceError {
  constructor() {
    super(GalleryServiceError, 'Gallery', 1060);
  }
}

export class GroupServiceError extends CmsApiServiceError {
  constructor() {
    super(GroupServiceError, 'Group', 1070);
  }
}

export class MenuServiceError extends CmsApiServiceError {
  constructor() {
    super(MenuServiceError, 'Menu', 1080);
  }
}

export class SitemapServiceError extends CmsApiServiceError {
  constructor() {
    super(SitemapServiceError, 'Sitemap', 1090);
  }
}

export class FormServiceError extends CmsApiServiceError {
  constructor() {
    super(FormServiceError, 'Form', 1100);
  }
}
