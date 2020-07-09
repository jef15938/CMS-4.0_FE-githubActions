import { InjectionToken } from '@angular/core';
import { RenderComponentMapping } from '../interface/render-component-mapping.interface';

export const RENDER_COMPONENT_MAPPING_TOKEN = new InjectionToken<RenderComponentMapping<any>[]>('RENDER_COMPONENT_MAPPING_TOKEN');
export const RENDER_DEFAULT_COMPONENT_MAPPING_TOKEN = new InjectionToken<RenderComponentMapping<any>[]>('RENDER_DEFAULT_COMPONENT_MAPPING_TOKEN');
