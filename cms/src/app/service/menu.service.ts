import { ICmsExtensionMenuResolver } from '@cms-lib';
import { of, Observable } from 'rxjs';

export class MenuService implements ICmsExtensionMenuResolver {
  resolve: () => Observable<any[]> = () => {
    return of([
      {
        func_id: '',
        func_name: 'APP Extension',
        component_id: '',
        children: [
          {
            func_id: 'func-test1',
            func_name: 'test1',
            component_id: 'test1',
            children: []
          },
          {
            func_id: 'func-test2',
            func_name: 'test2',
            component_id: 'test2',
            children: []
          }
        ]
      },
    ]);
  }
}
