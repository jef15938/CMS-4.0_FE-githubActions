import { InjectionToken } from '@angular/core';
import { DataSourceFactory } from './layout-base.interface';

export const DATA_SOURCE_FACTORY_TOKEN
  = new InjectionToken<DataSourceFactory<any>>('RENDER_CUSTOM_COMPONENT_MAPPINGS_TOKEN');
