import { PageInfo } from '../../neuxAPI/bean/PageInfo';
import { ModelMapping } from '../model-mapper';

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

  public totalPageSize: number;
  public totalRecSize: number;
  public page: number;

}
