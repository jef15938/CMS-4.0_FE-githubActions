import { Observable } from 'rxjs';
import { Injector, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FarmFormInfoModel, FarmFormInfoModelColumn } from '../../../global/api/data-model/models/farm-form-info.model';
import { FarmTableDataInfoModel } from '../../../global/api/data-model/models/farm-table-data-info.model';
import { FarmTableInfoModel } from '../../../global/api/data-model/models/farm-table-info.model';
import { FarmCategoryInfoModel } from '../../../global/api/data-model/models/farm-category-info.model';

export interface FarmPlugingCustomComponentParameterEvent {
  dataCreateEdit: Observable<{ category: FarmCategoryInfoModel, row: FarmTableDataInfoModel }>;
}

export interface FarmPlugingCustomComponentParameter {
  events: FarmPlugingCustomComponentParameterEvent;
  refresh(): Observable<any>;
}

export interface FarmPlugingCustomComponent {
  onCompInit: (params: FarmPlugingCustomComponentParameter) => any;
}

export interface FarmPlugin {
  funcId: string;

  customComponents?: {
    main?: {
      footer?: Type<FarmPlugingCustomComponent>;
    }
  };

  tableActionBtns?: FarmPluginTableActionBtn[];

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
