import { ValidateNested } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { SiteMapNodeGetResponse } from '../../neuxAPI/bean/SiteMapNodeGetResponse';
import { SiteNodeDetailInfoModel } from './site-node-detail-info.model';
import { PublishInfoModel } from './publish-info.model';
import { ModelMapping, ModelMapper } from '@neux/core';

// @dynamic
@ModelMapping(
  SiteMapNodeGetResponse, SiteMapNodeGetResponseModel,
  (bean, model) => {
    model.nodeId = bean.node_id;
    model.layoutId = bean.layout_id;
    model.isMegaMenu = bean.is_mega_menu;
    model.nodeType = bean.node_type || '';
    model.funcId = bean.func_id;
    model.contentId = bean.content_id;
    model.urlType = bean.url_type;
    model.urlLinkNodeId = bean.url_link_node_id;
    model.url = bean.url;
    model.urlBlank = bean.url_blank;
    model.contentPath = bean.content_path;
    model.version = bean.version;
    model.canModify = bean.canModify;
    model.canSubmit = bean.canSubmit;
    model.canPreview = bean.canPreview;
    model.createBy = bean.create_by;
    model.createTime = bean.create_time;
    model.updateBy = bean.update_by;
    model.updateTime = bean.update_time;
    model.publishInfo = ModelMapper.mapModelTo(PublishInfoModel, bean.publish_info);
    model.details = ModelMapper.mapArrayTo(SiteNodeDetailInfoModel, bean.details);
    model.device = bean['device'] || '';
  }
)
export class SiteMapNodeGetResponseModel {

  @IsNotEmpty()
  public nodeId: string;
  public isMegaMenu: boolean;
  public layoutId: string;
  public nodeType: string;
  public funcId: string;
  public contentId: string;
  public urlType: string;
  public urlLinkNodeId: string;
  public url: string;
  public urlBlank: string;
  public contentPath: string;
  public version: string;
  @IsNotEmpty()
  public canModify: boolean;
  @IsNotEmpty()
  public canSubmit: boolean;
  @IsNotEmpty()
  public canPreview: boolean;
  @IsNotEmpty()
  public createBy: string;
  @IsNotEmpty()
  public createTime: string;
  @IsNotEmpty()
  public updateBy: string;
  @IsNotEmpty()
  public updateTime: string;
  @ValidateNested()
  public publishInfo: PublishInfoModel;
  @ValidateNested()
  @IsNotEmpty()
  public details: Array<SiteNodeDetailInfoModel>;
  public device: 'pc' | 'pad' | 'mobile';
}
