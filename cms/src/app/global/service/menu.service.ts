import { CmsExtensionMenuResolver } from '@neux/cms-core';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuService implements CmsExtensionMenuResolver {
  resolve: () => Observable<any[]> = () => {
    return of([
      {
        func_id: 'app-extension-1',
        func_name: 'APP 擴充 1',
        component_id: '',
        children: [
          {
            func_id: 'app-extension-1-1',
            func_name: 'APP 擴充 1-1',
            component_id: '',
            children: []
          },
          {
            func_id: 'app-extension-1-2',
            func_name: 'APP 擴充 1-2',
            component_id: '',
            children: []
          }
        ]
      },
      {
        func_id: 'app-extension-2',
        func_name: 'APP 擴充 2',
        component_id: '',
        children: [
          {
            func_id: 'app-extension-2-1',
            func_name: 'APP 擴充 2-1',
            component_id: '',
            children: []
          }
        ]
      },
    ]);
  }
}
