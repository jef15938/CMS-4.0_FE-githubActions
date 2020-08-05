import { Observable } from 'rxjs';
import { CmsFarmFormInfo, CmsFarmTableInfo, CmsFarmTableDataInfo } from '../../../global/model';
import { Injector } from '@angular/core';

export interface FarmFormComp {
  requestFormInfo(): Observable<CmsFarmFormInfo>;
}

export interface FarmTableActionBtn {
  icon?: string;
  fontSet?: string;
  fontIcon?: string;
  click: (row: CmsFarmTableDataInfo, table: CmsFarmTableInfo, injector: Injector) => void;
}


export interface FarmTableAction {
  funcID: string;
  btns: FarmTableActionBtn[];
}
