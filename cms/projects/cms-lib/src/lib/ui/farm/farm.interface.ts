import { CmsFarmFormInfo } from '../../type/farm.class';
import { Observable } from 'rxjs';

export interface FarmFormComp {
  requestFormInfo(): Observable<CmsFarmFormInfo>;
}