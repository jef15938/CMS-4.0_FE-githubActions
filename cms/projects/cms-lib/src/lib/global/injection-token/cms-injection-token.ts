import { InjectionToken } from '@angular/core';
import { CustomActionInfo } from '@neux/render';
import { CmsEnviroment } from '../interface';

export const CMS_ENVIROMENT_TOKEN = new InjectionToken<CmsEnviroment>('CMS_ENVIROMENT_TOKEN');
export const CMS_CUSTOM_ACTION_TOKEN = new InjectionToken<CustomActionInfo>('CMS_CUSTOM_ACTION_TOKEN');
