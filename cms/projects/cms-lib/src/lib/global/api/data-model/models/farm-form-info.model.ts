import { FarmFormInfo } from '../../neuxAPI/bean/FarmFormInfo';
import { ModelMapping, ModelMapper } from '@neux/core';
import { FarmValidationInfoModel } from './farm-validation-info.model';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export enum FarmFormInfoColumnDisplayType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
  GALLERY = 'GALLERY',
  EDITOR = 'EDITOR',
  HTMLEDITOR = 'HTMLEDITOR',
  DATETIME = 'DATETIME',
  TREE = 'TREE',
  LABEL = 'LABEL',
  CUSTOM = 'CUSTOM',
  LINK = 'LINK',
}

export enum FarmFormInfoColumnTriggerType {
  DATATRIGGER = 'DATA',
  ENABLETRIGGER = 'ENABLE',
  READONLYTRIGGER = 'READONLY',
  REQUIREDTRIGGER = 'REQUIRED',
}

type FarmFormInfoColumn = {
  display_text: string; // 欄位顯示名稱
  display_type: FarmFormInfoColumnDisplayType; // 欄位顯示類型
  value: any; // 欄位值
  column_id: string; // 視為 input 的 name
  triggers: {
    trigger_type: FarmFormInfoColumnTriggerType; // 驅動類型
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
    limit_file_name_ext?: string; // 媒體庫挑選副檔名限制(Gallery Type限定)
  };
  is_readonly: boolean;
};

export type FarmFormInfoModelColumn = {
  displayText: string; // 欄位顯示名稱
  displayType: FarmFormInfoColumnDisplayType; // 欄位顯示類型
  value: any; // 欄位值
  columnId: string; // 視為 input 的 name
  triggers: {
    triggerType: FarmFormInfoColumnTriggerType; // 驅動類型
    triggerTarget: string[]; // 放哪些欄位被連動
    triggerSetting: { [key: string]: string };
  }[];
  setting: {
    maxLength?: number; // 最大長度(只有 TEXT 跟 TEXTAREA 才有)
    options?: {
      value: string;
      text: string;
    }[]; // 選單類內容
    placeholder?: string; // 最大長度(只有 TEXT 跟 TEXTAREA 才有)
    treeSource?: string; // Type為TREE才會有，主要放長TREE的API路徑
    fileName?: string; // 上傳後的檔名
    url?: string; // 當type是LINK時提供url網址
    componentId?: string; // for CUSTOM，目前只有前端用
    limitFileNameExt?: string; // 媒體庫挑選副檔名限制(Gallery Type限定)
  };
  isReadonly: boolean;
};

// @dynamic
@ModelMapping(
  FarmFormInfo, FarmFormInfoModel,
  (bean, model) => {
    model.splitSize = bean.split_size;
    model.columns = (bean.columns as FarmFormInfoColumn[]).map(c => {
      return {
        displayText: c.display_text,
        displayType: c.display_type,
        value: c.value,
        columnId: c.column_id,
        triggers: (c.triggers || []).map(t => {
          return {
            triggerType: t.trigger_type,
            triggerTarget: t.trigger_target,
            triggerSetting: t.trigger_setting,
          };
        }),
        setting: !c.setting ? c.setting : {
          maxLength: c.setting.max_length,
          options: (c.setting.options || []).map(o => {
            return {
              value: o.value,
              text: o.text,
            };
          }),
          placeholder: c.setting.placeholder,
          treeSource: c.setting.tree_source,
          fileName: c.setting.file_name,
          url: c.setting.url,
          componentId: c.setting.component_id,
          limitFileNameExt: c.setting.limit_file_name_ext,
        },
        isReadonly: c.is_readonly,
      };
    });
    model.validation = ModelMapper.mapModelTo(FarmValidationInfoModel, bean.validation);
  }
)
export class FarmFormInfoModel {

  @IsNotEmpty()
  public splitSize: number;
  public columns: Array<FarmFormInfoModelColumn>;
  @ValidateNested()
  public validation: FarmValidationInfoModel;

}
