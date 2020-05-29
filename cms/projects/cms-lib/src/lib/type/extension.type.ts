import { Type, TemplateRef } from '@angular/core';
import { MenuInfo } from '../neuxAPI/bean/MenuInfo';
import { Observable } from 'rxjs';

export interface ICmsExtensionMenuResolver {
  resolve: () => Observable<MenuInfo[]>;
}

export interface ICmsExtensionComponentMapping<TComponent> {
  component_id: string;
  component: Type<TComponent> | TemplateRef<TComponent>
}