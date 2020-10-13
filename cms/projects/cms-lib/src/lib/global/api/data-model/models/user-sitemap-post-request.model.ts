import { IsNotEmpty } from 'class-validator';
import { UserSiteMapPostRequest } from '../../neuxAPI/bean/UserSiteMapPostRequest';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  UserSiteMapPostRequest, UserSiteMapPostRequestModel,
  (bean, model) => {
    model.nodeName = bean.node_name;
    model.layoutId = bean.layout_id;
    model.parentId = bean.parent_id;
    model.nodeType = bean.node_type;
    model.urlType = bean.url_type;
    model.urlLinkNodeId = bean.url_link_node_id;
    model.url = bean.url;
    model.urlBlank = bean.url_blank;
    model.contentPath = bean.content_path;
    model.metaTitle = bean.meta_title;
    model.metaDescription = bean.meta_description;
    model.metaKeyword = bean.meta_keyword;
    model.metaImage = bean.meta_image;
    model.assignGroupId = bean.assign_group_id;
    model.isMegaMenu = bean.is_mega_menu;
    model.device = bean.device;
  }
)
@ModelMapping(
  UserSiteMapPostRequestModel, UserSiteMapPostRequest,
  (model, bean) => {
    bean.node_name = model.nodeName;
    bean.layout_id = model.layoutId;
    bean.parent_id = model.parentId;
    bean.node_type = model.nodeType;
    bean.url_type = model.urlType;
    bean.url_link_node_id = model.urlLinkNodeId;
    bean.url = model.url;
    bean.url_blank = model.urlBlank;
    bean.content_path = model.contentPath;
    bean.meta_title = model.metaTitle;
    bean.meta_description = model.metaDescription;
    bean.meta_keyword = model.metaKeyword;
    bean.meta_image = model.metaImage;
    bean.assign_group_id = model.assignGroupId;
    bean.is_mega_menu = model.isMegaMenu;
    bean['device'] = model.device;
  }
)
export class UserSiteMapPostRequestModel {

  @IsNotEmpty()
  public nodeName: string;
  public layoutId: string;
  public isMegaMenu: boolean;
  public parentId: string;
  public nodeType: string;
  public urlType: string;
  public urlLinkNodeId: string;
  public url: string;
  public urlBlank: string;
  public contentPath: string;
  @IsNotEmpty()
  public metaTitle: string;
  public metaDescription: string;
  public metaKeyword: string;
  public metaImage: string;
  @IsNotEmpty()
  public assignGroupId: string;
  public device: string;
}
