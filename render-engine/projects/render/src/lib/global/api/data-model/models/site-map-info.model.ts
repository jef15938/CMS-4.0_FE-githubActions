import { ValidateNested, IsNotEmpty } from 'class-validator';
import { SiteMapInfo } from '../../neuxAPI/bean/SiteMapInfo';
import { ModelMapping, ModelMapper } from '@neux/core';
import { SiteMapLanguageInfoModel } from './site-map-language-info.model';

// @dynamic
@ModelMapping(
  SiteMapInfo, SiteMapInfoModel,
  (bean, model) => {
    model.nodeId = bean.node_id;
    model.url = bean.url;
    model.urlBlank = bean.url_blank;
    model.contentId = bean.content_id;
    model.contentPath = bean.content_path;
    model.isMegamenu = bean.is_mega_menu;
    model.children = ModelMapper.mapArrayTo(SiteMapInfoModel, bean.children);
    model.languages = ModelMapper.mapArrayTo(SiteMapLanguageInfoModel, bean.languages);
  }
)
export class SiteMapInfoModel {

  @IsNotEmpty()
  public nodeId: string;
  @ValidateNested()
  public languages: Array<SiteMapLanguageInfoModel>;
  public url: string;
  public urlBlank: string;
  @ValidateNested()
  public children: Array<SiteMapInfoModel>;
  @IsNotEmpty()
  public contentId: string;
  public contentPath: string;
  public isMegamenu: boolean;
}
