import { ICmsExtensionMenuResolver } from 'projects/cms-lib/src/lib/type/extension.type';
import { MenuInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/MenuInfo';
import { of, Observable } from 'rxjs';

export class MenuService implements ICmsExtensionMenuResolver {
  resolve: () => Observable<MenuInfo[]> = () => {
    return of([
      {
        func_id: "",
        func_name: "APP Extension",
        component_id: "",
        children: [
          {
            func_id: "func-test1",
            func_name: "test1",
            component_id: "test1",
            children: []
          },
          {
            func_id: "func-test2",
            func_name: "test2",
            component_id: "test2",
            children: []
          }
        ]
      },
    ]);
  };
}