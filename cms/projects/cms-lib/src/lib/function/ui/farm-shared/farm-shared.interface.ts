import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { FarmFormInfoModel, FarmFormInfoModelColumn } from '../../../global/api/data-model/models/farm-form-info.model';
import { FarmTableDataInfoModel } from '../../../global/api/data-model/models/farm-table-data-info.model';
import { FarmTableInfoModel } from '../../../global/api/data-model/models/farm-table-info.model';
import { FormGroup } from '@angular/forms';

export interface FarmCustomHandler {
  funcId: string;
  onFormGalleryColumnBeforeSelectImage?(
    column: FarmFormInfoModelColumn,
    farmFormInfo: FarmFormInfoModel,
    formGroup: FormGroup,
  ): Observable<any>;
}

export interface FarmTableActionBtn {
  icon?: string;
  fontSet?: string;
  fontIcon?: string;
  tooltip?: string;
  class?: string;
  click: (row: FarmTableDataInfoModel, table: FarmTableInfoModel, injector: Injector) => void;
}


export interface FarmTableAction {
  funcID: string;
  btns: FarmTableActionBtn[];
}
