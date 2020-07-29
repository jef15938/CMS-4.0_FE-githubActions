import { RenderComponentMapping } from '@neux/render';
import { Test1Component } from '../../function/test/test1.component';
import { Test2Component } from '../../function/test/test2.component';
import { FarmCustomFormControlComponent } from '../../function/farm-custom-form-control/farm-custom-form-control.component';

export const COMPONENT_MAPPINGS: RenderComponentMapping<any>[] = [
  {
    component_id: 'app-extension-1-1',
    component: Test1Component
  },
  {
    component_id: 'app-extension-1-2',
    component: Test2Component
  },
  {
    component_id: 'app-extension-2-1',
    component: Test2Component
  },
  {
    component_id: 'farm-custom-form-control',
    component: FarmCustomFormControlComponent
  },
];
