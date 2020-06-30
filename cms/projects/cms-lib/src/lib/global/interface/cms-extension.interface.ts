import { Type, TemplateRef } from '@angular/core';
import { MenuInfo } from '../api/neuxAPI/bean/MenuInfo';
import { Observable } from 'rxjs';

export interface CmsExtensionMenuResolver {
  resolve: () => Observable<MenuInfo[]>;
}

export interface CmsExtensionComponentMapping<TComponent> {
  component_id: string;
  component: Type<TComponent> | TemplateRef<TComponent>;
}
