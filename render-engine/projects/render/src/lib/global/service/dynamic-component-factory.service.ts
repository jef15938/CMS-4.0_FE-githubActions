import { Injectable, Injector } from '@angular/core';
import {
  RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN,
  RENDER_CUSTOM_COMPONENT_MAPPINGS_TOKEN,
  RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN,
} from '../injection-token/injection-token';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentFactoryService {

  constructor(private injector: Injector) { }

  getComponent(componentId: string) {
    const defaultComponentMappings = this.getDefaultComponentMappings();
    const customComponentMappings = this.getCustomComponentMappings();
    const mapping = customComponentMappings.find(m => m.component_id === componentId)
      || defaultComponentMappings.find(m => m.component_id === componentId);
    const component = mapping?.component;
    return component;
  }

  getAppShellNoRenderComponentIds(): string[] {
    let ids = [];
    try {
      ids = this.injector.get(RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN);
    } catch (error) {
    }
    return ids;
  }

  private getDefaultComponentMappings() {
    const mappings = this.injector.get(RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN);
    return mappings || [];
  }

  getCustomComponentMappings() {
    let mappings = [];
    try {
      mappings = this.injector.get(RENDER_CUSTOM_COMPONENT_MAPPINGS_TOKEN);
    } catch (error) {
    }
    return mappings;
  }
}
