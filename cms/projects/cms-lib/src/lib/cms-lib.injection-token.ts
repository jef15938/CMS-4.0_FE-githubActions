import { InjectionToken } from '@angular/core';
import { ICmsExtensionMenuResolver, ICmsExtensionComponentMapping } from './type/extension.type';

export const CmsExtensionComponentMappings = new InjectionToken<ICmsExtensionComponentMapping<any>[]>('CmsExtensionComponentMappings');
export const CmsExtensionMenuResolver = new InjectionToken<ICmsExtensionMenuResolver>('CmsExtensionMenuResolver');