import { IsNotEmpty } from 'class-validator';
import { FarmOptionInfo } from '../../neuxAPI/bean/FarmOptionInfo';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  FarmOptionInfo, FarmOptionInfoModel,
  (bean, model) => {
    model.value = bean.value;
    model.text = bean.text;
  }
)
export class FarmOptionInfoModel {

  @IsNotEmpty()
  public value: string;
  @IsNotEmpty()
  public text: string;

}
