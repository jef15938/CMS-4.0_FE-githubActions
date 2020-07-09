import { RenderComponentMapping } from 'render';
import { Test1Component } from '../../function/test/test1.component';
import { Test2Component } from '../../function/test/test2.component';
import { FarmCustomFormControlComponent } from '../../function/farm-custom-form-control/farm-custom-form-control.component';

export const COMPONENT_MAPPINGS: RenderComponentMapping<any>[] = [
  {
    component_id: 'test1',
    component: Test1Component
  },
  {
    component_id: 'test2',
    component: Test2Component
  },
  {
    component_id: 'farm-custom-form-control',
    component: FarmCustomFormControlComponent
  },
];
