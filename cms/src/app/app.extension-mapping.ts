import { ICmsExtensionComponentMapping } from 'projects/cms-lib/src/lib/type/extension.type';
import { Test1Component } from './test/test1.component';
import { Test2Component } from './test/test2.component';

export const ExtensionMappings: ICmsExtensionComponentMapping<any>[] = [
  {
    component_id: 'test1',
    component: Test1Component
  },
  {
    component_id: 'test2',
    component: Test2Component
  }
];