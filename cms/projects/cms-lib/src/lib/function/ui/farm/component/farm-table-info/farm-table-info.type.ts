import { CmsFarmTableDataInfo } from './../../../../../global/model';
import { CmsFarmTableDataAction } from './../../../../../global/enum';

export const ACTION_COLUMN = 'TABLE_ACTION_COLUMN';
export const CHECKBOX_COLUMN = 'TABLE_CHECKBOX_COLUMN';

export class FarmTableInfoActionEvent {
  constructor(
    public action: CmsFarmTableDataAction,
    public rowData: CmsFarmTableDataInfo,
  ) { }
}
