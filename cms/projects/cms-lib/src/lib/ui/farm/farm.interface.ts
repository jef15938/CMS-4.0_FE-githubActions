import { Observable } from 'rxjs';
import { CmsFarmFormInfo } from './../../type';

export interface FarmFormComp {
  requestFormInfo(): Observable<CmsFarmFormInfo>;
}

