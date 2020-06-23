import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MenuInfo } from './MenuInfo';
import { TypeFactory } from '../type-factory';


export class MenuGetResponse {

  @Type(TypeFactory(MenuInfo))
  @ValidateNested()
  public datas: Array<MenuInfo>;


}