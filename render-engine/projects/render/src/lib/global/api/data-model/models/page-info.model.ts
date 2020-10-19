import { ModelMapping } from '@neux/core';
import { PageInfo } from '../../neuxAPI/bean/PageInfo';
import { IsNotEmpty } from 'class-validator';

// @dynamic
@ModelMapping(
  PageInfo, PageInfoModel,
  (bean, model) => {
    model.totalPageSize = bean.total_page_size;
    model.totalRecSize = bean.total_rec_size;
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
