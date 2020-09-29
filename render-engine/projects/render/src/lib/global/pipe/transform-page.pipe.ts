import { Pipe, PipeTransform } from '@angular/core';
import { PageInfoModel } from '../api/data-model/models/page-info.model';
import { PaginationInfo } from '../component/public-component/pagination/pagination.interface';
@Pipe({ name: 'transformPageInfo' })
export class PageInfoPipe implements PipeTransform {

  constructor() { }

  transform(value: PageInfoModel): PaginationInfo {
    return {
      totalItems: value.totalRecSize,
      totalPage: value.totalPageSize,
      currentPage: value.page,
      pageSize: 10
    };
  }
}
