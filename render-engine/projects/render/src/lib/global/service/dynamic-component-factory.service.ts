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
    const mapping = [...customComponentMappings, ...defaultComponentMappings].find(m => m.component_id === componentId);
    const component = mapping?.component;
    return component;
  }

  getAppShellNoRenderComponentIds() {
    return this.injector.get(RENDER_APP_SHELL_NO_RENDER_COMPONENT_IDS_TOKEN, []);
  }

  private getDefaultComponentMappings() {
    return this.injector.get(RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN, []);
  }

  private getCustomComponentMappings() {
    return this.injector.get(RENDER_CUSTOM_COMPONENT_MAPPINGS_TOKEN, []);
  }
}
