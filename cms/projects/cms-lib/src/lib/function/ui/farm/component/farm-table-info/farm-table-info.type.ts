import { CmsFarmTableDataInfo } from './../../../../../global/model';
import { CmsFarmTableDataAction } from './../../../../../global/enum';

export const ACTION_COLUMN = 'TABLE_ACTIONS';

export class FarmTableInfoActionEvent {
  constructor(
    public action: CmsFarmTableDataAction,
    public rowData: CmsFarmTableDataInfo,
  ) { }
}
