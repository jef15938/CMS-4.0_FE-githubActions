import { FarmInfoGetResponse } from '../neuxAPI/bean/FarmInfoGetResponse';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { FarmFormInfo } from '../neuxAPI/bean/FarmFormInfo';
import { FarmTableInfo } from '../neuxAPI/bean/FarmTableInfo';
import { Type } from 'class-transformer';
import { FarmTableDataInfo } from '../neuxAPI/bean/FarmTableDataInfo';
import { CmsFarmFormColumnDisplayType, CmsFarmTableColumnDisplayType, CmsFarmTableDataAction } from './farm.enum';
import { FarmValidationInfo } from '../neuxAPI/bean/FarmValidationInfo';

export class CmsFarmValidationInfo extends FarmValidationInfo {
  public required: {
    id: string; // Field ID
    setting: { [key: string]: any }
  }[];
  public email: {
    id: string;
    setting: { [key: string]: any }
  }[];
  public alphanumeric: {
    id: string;
    setting: { [key: string]: any }
  }[];
  public number: {
    id: string;
    setting: { [key: string]: any }
  }[];
  public range: {
    start_column: string;
    end_column: string;
  }[];
}

export class CmsFarmTableDataColumn {
  display_type: CmsFarmTableColumnDisplayType; // 顯示類型
  value: string; // 顯示值
  display_text: string; // 顯示標題
  actions: CmsFarmTableDataAction[]; // 該筆可以做的操作
}

export class CmsFarmTableDataInfo extends FarmTableDataInfo {
  public columns: CmsFarmTableDataColumn[];
}

export class CmsFarmTableInfo extends FarmTableInfo {
  @Type(() => CmsFarmTableDataInfo)
  @ValidateNested()
  public datas: CmsFarmTableDataInfo[];
}

export class CmsFarmFormColumn {
  display_text: string; // 欄位顯示名稱
  display_type: CmsFarmFormColumnDisplayType; // 欄位顯示類型
  options: {
    value: string;
    text: string;
  }[]; // 選單類內容
  value: string; // 欄位值
  max_length: number; // 最大長度(只有 TEXT 跟 TEXTAREA 才有)
  placeholder: string; // 最大長度(只有 TEXT 跟 TEXTAREA 才有)
  column_id: string; // 視為 input 的 name
  is_readonly: boolean;
  triggers: {
    trigger_type: string; // 驅動類型
    trigger_target: string[]; // 放哪些欄位被連動
    trigger_setting: { [key: string]: string };
  }[];
}

export class CmsFarmFormInfo extends FarmFormInfo {
  public columns: CmsFarmFormColumn[];

  @Type(() => CmsFarmValidationInfo)
  @ValidateNested()
  public validation: CmsFarmValidationInfo;
}

export class CmsFarmInfoCategory {
  searchInfo: CmsFarmFormInfo;
  tableInfo: CmsFarmTableInfo;
  category_name: string;
  category_id: string;
}

export class FarmInfo extends FarmInfoGetResponse {
  @IsNotEmpty()
  public category: CmsFarmInfoCategory[];

  @Type(() => CmsFarmFormInfo)
  @ValidateNested()
  public detailInfo: CmsFarmFormInfo;
}