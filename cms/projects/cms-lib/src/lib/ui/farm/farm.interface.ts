import { Observable } from 'rxjs';
import { CmsFarmFormInfo } from '@cms-lib/type';

export interface FarmFormComp {
  requestFormInfo(): Observable<CmsFarmFormInfo>;
}

