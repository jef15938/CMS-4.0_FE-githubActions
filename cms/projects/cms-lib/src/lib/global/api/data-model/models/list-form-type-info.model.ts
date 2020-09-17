import { IsNotEmpty } from 'class-validator';
import { ListFormTypeInfo } from '../../neuxAPI/bean/ListFormTypeInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  ListFormTypeInfo, ListFormTypeInfoModel,
  (bean, model) => {
    model.id = bean.id;
    model.name = bean.name;
  }
)
export class ListFormTypeInfoModel {

  @IsNotEmpty()
  public id: string;
  @IsNotEmpty()
  public name: string;

}
