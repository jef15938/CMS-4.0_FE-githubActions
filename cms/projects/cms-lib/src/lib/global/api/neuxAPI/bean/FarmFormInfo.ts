import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { FarmValidationInfo } from './FarmValidationInfo';
import { TypeFactory } from '../type-factory';


export class FarmFormInfo {

  @IsNotEmpty()
  public split_size: number;
  public columns: Array<object>;
  @Type(TypeFactory(FarmValidationInfo))
  @ValidateNested()
  public validation: FarmValidationInfo;


}
