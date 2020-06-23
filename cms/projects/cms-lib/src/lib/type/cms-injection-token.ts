import { InjectionToken } from '@angular/core';
import { CmsExtensionMenuResolver, CmsExtensionComponentMapping, CmsEnviroment } from './../type';

export const CMS_ENVIROMENT = new InjectionToken<CmsEnviroment>('CmsExtensionMenuResolver');

export const CMS_EXTENSION_COMPONENT_MAPPINGS = new InjectionToken<CmsExtensionComponentMapping<any>[]>('CmsExtensionComponentMappings');
export const CMS_EXTENSION_MENU_RESOLVER = new InjectionToken<CmsExtensionMenuResolver>('CmsExtensionMenuResolver');
