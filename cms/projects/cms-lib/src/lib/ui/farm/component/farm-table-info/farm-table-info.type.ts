import { CmsFarmTableDataAction } from 'projects/cms-lib/src/lib/type/farm.enum';
import { CmsFarmTableDataInfo } from 'projects/cms-lib/src/lib/type/farm.class';

export const ACTION_COLUMN = 'TABLE_ACTIONS';

export class FarmTableInfoActionEvent {
  constructor(
    public action: CmsFarmTableDataAction,
    public rowData: CmsFarmTableDataInfo,
  ) { }
}