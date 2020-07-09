import { InjectionToken } from '@angular/core';
import { CmsExtensionMenuResolver, CmsEnviroment } from '../interface';

export const CMS_ENVIROMENT_TOKEN = new InjectionToken<CmsEnviroment>('CMS_ENVIROMENT_TOKEN');
export const CMS_EXTENSION_MENU_RESOLVER_TOKEN = new InjectionToken<CmsExtensionMenuResolver>('CMS_EXTENSION_MENU_RESOLVER_TOKEN');
