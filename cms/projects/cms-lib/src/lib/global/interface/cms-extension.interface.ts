import { Observable } from 'rxjs';
import { MenuInfoModel } from '../api/data-model/models/menu-info.model';

export interface CmsExtensionMenuResolver {
  resolve: () => Observable<MenuInfoModel[]>;
}
