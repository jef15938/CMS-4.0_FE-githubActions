import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FarmFormInfoModel, FarmFormInfoModelColumn } from '../../../global/api/data-model/models/farm-form-info.model';
import { FarmTableDataInfoModel } from '../../../global/api/data-model/models/farm-table-data-info.model';
import { FarmTableInfoModel } from '../../../global/api/data-model/models/farm-table-info.model';
import { FarmInfoGetResponseModel } from '../../../global/api/data-model/models/farm-info-get-response.model';
import { FarmCategoryInfoModel } from '../../../global/api/data-model/models/farm-category-info.model';

export interface FarmPlugin {
  funcId: string;

  tableActionBtns?: FarmPluginTableActionBtn[];
  tableBottomBtns?: FarmPluginTableBottomBtn[];

  onFormGalleryColumnBeforeSelectImage?(
    column: FarmFormInfoModelColumn,
    farmFormInfo: FarmFormInfoModel,
    formGroup: FormGroup,
  ): Observable<any>;
}

export interface FarmPluginTableActionBtn {
  icon?: string;
  fontSet?: string;
  fontIcon?: string;
  tooltip?: string;
  class?: string;
  click: (event: {
    row: FarmTableDataInfoModel,
    table: FarmTableInfoModel,
    injector: Injector
  }) => void;
}

export interface FarmPluginTableBottomBtn {
  text: string;
  class?: string;
  click: (event: {
    funcID: string,
    farm: FarmInfoGetResponseModel,
    category: FarmCategoryInfoModel,
    injector: Injector
  }) => void;
}
