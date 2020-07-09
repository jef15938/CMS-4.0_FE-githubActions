import { Type, TemplateRef } from '@angular/core';
import { MenuInfo } from '../api/neuxAPI/bean/MenuInfo';
import { Observable } from 'rxjs';

export interface CmsExtensionMenuResolver {
  resolve: () => Observable<MenuInfo[]>;
}
