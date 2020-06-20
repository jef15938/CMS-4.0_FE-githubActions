import { InjectionToken } from '@angular/core';
import { CmsExtensionMenuResolver, CmsExtensionComponentMapping } from './type/extension.type';

export const CMS_EXTENSION_COMPONENT_MAPPINGS = new InjectionToken<CmsExtensionComponentMapping<any>[]>('CmsExtensionComponentMappings');
export const CMS_EXTENSION_MENU_RESOLVER = new InjectionToken<CmsExtensionMenuResolver>('CmsExtensionMenuResolver');
