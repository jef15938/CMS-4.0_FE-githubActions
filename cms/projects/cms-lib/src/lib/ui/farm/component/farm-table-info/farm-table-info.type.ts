import { CmsFarmTableInfo, CmsFarmTableDataInfo, CmsFarmTableDataAction } from '@cms-lib/type';


export const ACTION_COLUMN = 'TABLE_ACTIONS';

export class FarmTableInfoActionEvent {
  constructor(
    public action: CmsFarmTableDataAction,
    public rowData: CmsFarmTableDataInfo,
  ) { }
}
