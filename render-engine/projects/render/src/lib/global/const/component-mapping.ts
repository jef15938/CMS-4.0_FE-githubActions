import { RenderComponentMapping } from '../interface';
import {
  TabDemoComponent, IconPageComponent, SliderComponent, FieldsDemoComponent, GroupTemplateDemoComponent, DataSourceDemoComponent
} from '../component';

export const RENDER_DEFAULT_COMPONENT_MAPPINGS: RenderComponentMapping<any>[] = [
  {
    component_id: 'Tab',
    component: TabDemoComponent,
  },
  {
    component_id: 'IconPage',
    component: IconPageComponent,
  },
  {
    component_id: 'Slide',
    component: SliderComponent,
  },
  {
    component_id: 'FieldsDemo',
    component: FieldsDemoComponent,
  },
  {
    component_id: 'GroupDemo',
    component: GroupTemplateDemoComponent,
  },
  {
    component_id: 'DataSourceDemo',
    component: DataSourceDemoComponent,
  }
];
