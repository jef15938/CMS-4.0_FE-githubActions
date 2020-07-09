import { InjectionToken } from '@angular/core';
import { RenderComponentMapping } from '../interface/render-component-mapping.interface';

export const RENDER_CUSTOM_COMPONENT_MAPPINGS_TOKEN
  = new InjectionToken<RenderComponentMapping<any>[]>('RENDER_CUSTOM_COMPONENT_MAPPINGS_TOKEN');
export const RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN
  = new InjectionToken<RenderComponentMapping<any>[]>('RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN');
export const RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN
  = new InjectionToken<string[]>('RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN');
