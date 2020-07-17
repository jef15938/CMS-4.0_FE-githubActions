import { Observable } from 'rxjs';
import { CmsFarmFormInfo } from '../../../global/model';

export interface FarmFormComp {
  requestFormInfo(): Observable<CmsFarmFormInfo>;
}

