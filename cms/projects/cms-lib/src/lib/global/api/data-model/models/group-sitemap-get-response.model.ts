import { ValidateNested } from 'class-validator';
import { GroupSiteMapGetResponse } from '../../neuxAPI/bean/GroupSiteMapGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { GroupSitemapInfoModel } from './group-sitemap-info.model';

// @dynamic
@ModelMapping(
  GroupSiteMapGetResponse, GroupSiteMapGetResponseModel,
  (bean, model) => {
    model.datas = ModelMapper.mapArrayTo(GroupSitemapInfoModel, bean.datas);
  }
)
export class GroupSiteMapGetResponseModel {

  @ValidateNested()
  public datas: Array<GroupSitemapInfoModel>;

}
