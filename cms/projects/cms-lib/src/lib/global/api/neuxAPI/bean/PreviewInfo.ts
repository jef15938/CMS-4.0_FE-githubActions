import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { TypeFactory } from '../type-factory';

export enum PreviewInfoType {
  ONE_PAGE = 'ONE_PAGE',
  FARM = 'FARM',
}

export class PreviewInfo {

  @IsNotEmpty()
  public preview_type: PreviewInfoType;
  public url: string;
  public func_id: string;
  public data_id: string;

}
