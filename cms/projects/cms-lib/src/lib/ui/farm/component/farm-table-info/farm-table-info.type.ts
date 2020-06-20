import { CmsFarmTableDataAction } from './../../../../type/farm.enum';
import { CmsFarmTableDataInfo } from './../../../../type/farm.class';

export const ACTION_COLUMN = 'TABLE_ACTIONS';

export class FarmTableInfoActionEvent {
  constructor(
    public action: CmsFarmTableDataAction,
    public rowData: CmsFarmTableDataInfo,
  ) { }
}
