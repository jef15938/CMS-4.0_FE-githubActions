import { UserSiteMapPutRequest } from '../../neuxAPI/bean/UserSiteMapPutRequest';
import { ModelMapping, ModelMapper } from '@neux/core';
import { ValidateNested } from 'class-validator';
import { SiteNodeDetailInfoModel } from './site-node-detail-info.model';
import { SiteNodeDetailInfo } from '../../neuxAPI/bean/SiteNodeDetailInfo';

// @dynamic
@ModelMapping(
  UserSiteMapPutRequest, UserSiteMapPutRequestModel,
  (bean, model) => {
    model.parentId = bean.parent_id;
    model.urlType = bean.url_type;
    model.urlLinkNodeId = bean.url_link_node_id;
    model.url = bean.url;
    model.urlBlank = bean.url_blank;
    model.contentPath = bean.content_path;
    model.isMegaMenu = bean.is_mega_menu;
    model.details = ModelMapper.mapArrayTo(SiteNodeDetailInfoModel, bean.details);
  }
)
@ModelMapping(
  UserSiteMapPutRequestModel, UserSiteMapPutRequest,
  (model, bean) => {
    bean.parent_id = model.parentId;
    bean.is_mega_menu = model.isMegaMenu;
    bean.url_type = model.urlType;
    bean.url_link_node_id = model.urlLinkNodeId;
    bean.url = model.url;
    bean.url_blank = model.urlBlank;
    bean.content_path = model.contentPath;
    bean.details = ModelMapper.mapArrayTo(SiteNodeDetailInfo, model.details);
  }
)
export class UserSiteMapPutRequestModel {

  public parentId: string;
  public isMegaMenu: boolean;
  public urlType: string;
  public urlLinkNodeId: string;
  public url: string;
  public urlBlank: string;
  public contentPath: string;
  @ValidateNested()
  public details: Array<SiteNodeDetailInfoModel>;

}
