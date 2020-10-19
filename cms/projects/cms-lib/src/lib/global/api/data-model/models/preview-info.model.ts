import { IsNotEmpty } from 'class-validator';
import { PreviewInfo } from '../../neuxAPI/bean/PreviewInfo';
import { ModelMapping } from '@neux/core';

export enum PreviewInfoType {
  ONE_PAGE = 'ONE_PAGE',
  FARM = 'FARM',
}

// @dynamic
@ModelMapping(
  PreviewInfo, PreviewInfoModel,
  (bean, model) => {
    model.previewType = bean.preview_type as PreviewInfoType;
    model.url = bean.url;
    model.funcId = bean.func_id;
    model.dataId = bean.data_id;
  }
)
export class PreviewInfoModel {

  @IsNotEmpty()
  public previewType: PreviewInfoType;
  public url: string;
  public funcId: string;
  public dataId: string;

}
