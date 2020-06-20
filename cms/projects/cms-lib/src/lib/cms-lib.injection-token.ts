import { InjectionToken } from '@angular/core';
import { CmsExtensionMenuResolver, CmsExtensionComponentMapping } from './type/extension.type';

export const CmsExtensionComponentMappingsInjectionToken = new InjectionToken<CmsExtensionComponentMapping<any>[]>('CmsExtensionComponentMappings');
export const CmsExtensionMenuResolverInjectionToken = new InjectionToken<CmsExtensionMenuResolver>('CmsExtensionMenuResolver');
