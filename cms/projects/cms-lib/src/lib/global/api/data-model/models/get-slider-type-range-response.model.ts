import { IsNotEmpty } from 'class-validator';
import { GetSliderTypeRangeResponse } from '../../neuxAPI/bean/GetSliderTypeRangeResponse';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  GetSliderTypeRangeResponse, GetSliderTypeRangeResponseModel,
  (bean, model) => {
    model.width = bean.width;
    model.height = bean.height;
  }
)
export class GetSliderTypeRangeResponseModel {

  @IsNotEmpty()
  public width: number;
  @IsNotEmpty()
  public height: number;
}
