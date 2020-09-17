import { ModelMapping } from '@neux/core';
import { PageInfo } from '../../neuxAPI/bean/PageInfo';
import { IsNotEmpty } from 'class-validator';

// @dynamic
@ModelMapping(
  PageInfo, PageInfoModel,
  (bean, model) => {
    model.totalPageSize = bean.totalPageSize;
    model.totalRecSize = bean.totalRecSize;
    model.page = bean.page;
  }
)
export class PageInfoModel {
  @IsNotEmpty()
  public totalPageSize: number;
  @IsNotEmpty()
  public totalRecSize: number;
  @IsNotEmpty()
  public page: number;
}
