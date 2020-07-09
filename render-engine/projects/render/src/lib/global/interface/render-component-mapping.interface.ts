import { Type } from '@angular/core';

export interface RenderComponentMapping<TComponent> {
  component_id: string;
  component: Type<TComponent>;
}
