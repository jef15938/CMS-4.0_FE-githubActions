import { InjectionToken } from '@angular/core';
import { RenderComponentMapping } from '../interface/render-component-mapping.interface';

export const RENDER_COMPONENT_SERVICE_TOKEN = new InjectionToken<any>('RENDER_COMPONENT_SERVICE_TOKEN');
export const RENDER_COMPONENT_MAPPING_TOKEN = new InjectionToken<RenderComponentMapping<any>[]>('RENDER_COMPONENT_MAPPING_TOKEN');
