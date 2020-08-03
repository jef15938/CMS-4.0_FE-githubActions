import { FarmInfoGetResponse } from './../../global/api/neuxAPI/bean/FarmInfoGetResponse';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { FarmFormInfo } from './../../global/api/neuxAPI/bean/FarmFormInfo';
import { FarmTableInfo } from './../../global/api/neuxAPI/bean/FarmTableInfo';
import { Type } from 'class-transformer';
import { FarmTableDataInfo } from './../../global/api/neuxAPI/bean/FarmTableDataInfo';
import { CmsFarmFormColumnDisplayType, CmsFarmTableColumnDisplayType, CmsFarmTableDataAction } from '../enum';
import { FarmValidationInfo } from './../../global/api/neuxAPI/bean/FarmValidationInfo';
import { TypeFactory } from './../../global/api/neuxAPI/type-factory';

export class CmsFarmValidationInfo extends FarmValidationInfo {
  public required: [];
  public email: string[];
  public alphanumeric: string[];
  public number: string[];
  public range: {
    start_column: string;
    end_column: string;
  }[];
}

export class CmsFarmTableDataColumn {
  display_type: CmsFarmTableColumnDisplayType; // 顯示類型
  value: string; // 顯示值
  display_text: string; // 顯示標題
}

export class CmsFarmTableDataInfo extends FarmTableDataInfo {
  columns: CmsFarmTableDataColumn[];
  actions: CmsFarmTableDataAction[]; // 該筆可以做的操作
}

export class CmsFarmTableInfo extends FarmTableInfo {
  @Type(TypeFactory(CmsFarmTableDataInfo))
  @ValidateNested()
  public datas: CmsFarmTableDataInfo[];
}

export class CmsFarmFormColumn {
  display_text: string; // 欄位顯示名稱
  display_type: CmsFarmFormColumnDisplayType; // 欄位顯示類型
  value: string; // 欄位值
  column_id: string; // 視為 input 的 name
  triggers: {
    trigger_type: string; // 驅動類型
    trigger_target: string[]; // 放哪些欄位被連動
    trigger_setting: { [key: string]: string };
  }[];
  setting: {
    max_length?: number; // 最大長度(只有 TEXT 跟 TEXTAREA 才有)
    options?: {
      value: string;
      text: string;
    }[]; // 選單類內容
    placeholder?: string; // 最大長度(只有 TEXT 跟 TEXTAREA 才有)
    tree_source?: string; // Type為TREE才會有，主要放長TREE的API路徑
    file_name?: string; // 上傳後的檔名
    url?: string; // 當type是LINK時提供url網址
    component_id?: string; // for CUSTOM，目前只有前端用
  };
  is_readonly: boolean;
}

export class CmsFarmFormInfo extends FarmFormInfo {
  public columns: CmsFarmFormColumn[];
  @Type(TypeFactory(CmsFarmValidationInfo))
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
  @Type(TypeFactory(CmsFarmFormInfo))
  @ValidateNested()
  public detailInfo: CmsFarmFormInfo;
}
