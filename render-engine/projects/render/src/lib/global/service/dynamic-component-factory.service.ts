import { Injectable, Injector } from '@angular/core';
import { RENDER_DEFAULT_COMPONENT_MAPPING_TOKEN, RENDER_COMPONENT_MAPPING_TOKEN } from '../injection-token/injection-token';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentFactoryService {

  constructor(private injector: Injector) { }

  getComponent(componentId: string) {
    // console.warn('DynamicComponentFactoryService.getComponent() componentId = ', componentId);

    const defaultComponentMappings = this.getDefaultComponentMappings();
    // console.warn('    defaultComponentMappings = ', defaultComponentMappings);

    const customComponentMappings = this.getCustomComponentMappings();
    // console.warn('    customComponentMappings = ', customComponentMappings);

    const mapping = customComponentMappings.find(m => m.component_id === componentId)
      || defaultComponentMappings.find(m => m.component_id === componentId);
    // console.warn('    mapping = ', mapping);

    const component = mapping?.component;
    // // console.warn('    component = ', component);

    return component;
  }

  private getDefaultComponentMappings() {
    const mappings = this.injector.get(RENDER_DEFAULT_COMPONENT_MAPPING_TOKEN);
    return mappings || [];
  }

  private getCustomComponentMappings() {
    try {
      const mappings = this.injector.get(RENDER_COMPONENT_MAPPING_TOKEN);
      return mappings || [];
    } catch (error) {
      return [];
    }
  }
}
