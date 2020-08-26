import { IsNotEmpty } from 'class-validator';
import { ContentVersionInfo } from '../../neuxAPI/bean/ContentVersionInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  ContentVersionInfo, ContentVersionInfoModel,
  (bean, model) => {
    model.version = bean.version;
    model.createTime = bean.create_time;
    model.createBy = bean.create_by;
  }
)
export class ContentVersionInfoModel {

  @IsNotEmpty()
  public version: number;
  @IsNotEmpty()
  public createTime: string;
  @IsNotEmpty()
  public createBy: string;

}
