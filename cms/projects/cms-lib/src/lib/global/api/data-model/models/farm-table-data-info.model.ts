import { IsNotEmpty } from 'class-validator';
import { FarmTableDataInfo } from '../../neuxAPI/bean/FarmTableDataInfo';
import { ModelMapping } from '@neux/core';

export enum FarmTableDataInfoColumnDisplayType {
  LABEL = 'LABEL',
  LINK = 'LINK',
}

export enum FarmTableDataInfoAction {
  CREATE = 'CREATE',
  MODIFY = 'MODIFY',
  DELETE = 'DELETE',
  PUBLISH = 'PUBLISH',
  OFF = 'OFF',
  PREVIEW = 'PREVIEW',
  MORE = 'MORE',
}

type FarmTableDataInfoColumn = {
  display_type: FarmTableDataInfoColumnDisplayType; // 顯示類型
  value: string; // 顯示值
  display_text: string; // 顯示標題
};

export type FarmTableDataInfoModelColumn = {
  displayType: FarmTableDataInfoColumnDisplayType; // 顯示類型
  value: string; // 顯示值
  displayText: string; // 顯示標題
};

// @dynamic
@ModelMapping(
  FarmTableDataInfo, FarmTableDataInfoModel,
  (bean, model) => {
    model.dataId = bean.data_id;
    model.isChecked = bean.is_checked;
    model.columns = (bean.columns || []).map((c: FarmTableDataInfoColumn) => {
      return {
        displayType: c.display_type,
        value: c.value,
        displayText: c.display_text,
      };
    });
    model.actions = bean.actions as FarmTableDataInfoAction[];
    model.moreFuncId = bean.moreFuncId;
  }
)
export class FarmTableDataInfoModel {

  @IsNotEmpty()
  public dataId: string;
  @IsNotEmpty()
  public isChecked: boolean;
  public columns: Array<FarmTableDataInfoModelColumn>;
  @IsNotEmpty()
  public actions: Array<FarmTableDataInfoAction>;
  public moreFuncId: string;

}
