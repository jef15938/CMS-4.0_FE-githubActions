import { IsNotEmpty } from 'class-validator';
import { ContentDataSource } from '../../neuxAPI/bean/ContentDataSource';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  ContentDataSource, ContentDataSourceModel,
  (bean, model) => {
    model.id = bean.id;
    model.name = bean.name;
  }
)
export class ContentDataSourceModel {

  @IsNotEmpty()
  public id: string;
  @IsNotEmpty()
  public name: string;

}
