import { ValidateNested, IsNotEmpty } from 'class-validator';
import { SiteMapGetResponse } from '../../neuxAPI/bean/SiteMapGetResponse';
import { ModelMapping, ModelMapper } from '@neux/core';

// @dynamic
@ModelMapping(
  SiteMapGetResponse, SiteMapGetResponseModel,
  (bean, model) => {
    model.nodeId = bean.node_id;
    model.nodeName = bean.node_name;
    model.url = bean.url;
    model.urlBlank = bean.url_blank;
    model.contentId = bean.content_id;
    model.contentPath = bean.content_path;
    model.children = ModelMapper.mapArrayTo(SiteMapGetResponseModel, bean.children);
  }
)
export class SiteMapGetResponseModel {

  @IsNotEmpty()
  public nodeId: string;
  @IsNotEmpty()
  public nodeName: string;
  public url: string;
  public urlBlank: string;
  @ValidateNested()
  public children: Array<SiteMapGetResponseModel>;
  @IsNotEmpty()
  public contentId: string;
  public contentPath: string;

}
