import { InjectionToken } from '@angular/core';
import { CmsExtensionMenuResolver, CmsExtensionComponentMapping, CmsEnviroment } from '../interface';

export const CMS_ENVIROMENT = new InjectionToken<CmsEnviroment>('CMS_ENVIROMENT');
export const CMS_EXTENSION_COMPONENT_MAPPINGS = new InjectionToken<CmsExtensionComponentMapping<any>[]>('CMS_EXTENSION_COMPONENT_MAPPINGS');
export const CMS_EXTENSION_MENU_RESOLVER = new InjectionToken<CmsExtensionMenuResolver>('CMS_EXTENSION_MENU_RESOLVER');
