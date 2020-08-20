import { FarmTableDataInfoAction, FarmTableDataInfoModel } from '../../../../../global/api/data-model/models/farm-table-data-info.model';


export const ACTION_COLUMN = 'TABLE_ACTION_COLUMN';
export const CHECKBOX_COLUMN = 'TABLE_CHECKBOX_COLUMN';

export class FarmTableInfoActionEvent {
  constructor(
    public action: FarmTableDataInfoAction,
    public rowData: FarmTableDataInfoModel,
  ) { }
}
