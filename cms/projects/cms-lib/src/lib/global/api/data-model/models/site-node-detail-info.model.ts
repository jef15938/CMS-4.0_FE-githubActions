import { IsNotEmpty } from 'class-validator';
import { SiteNodeDetailInfo } from '../../neuxAPI/bean/SiteNodeDetailInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  SiteNodeDetailInfo, SiteNodeDetailInfoModel,
  (bean, model) => {
    model.languageId = bean.language_id;
    model.languageName = bean.language_name;
    model.nodeName = bean.node_name;
    model.metaTitle = bean.meta_title;
    model.metaDescription = bean.meta_description;
    model.metaKeyword = bean.meta_keyword;
    model.metaImage = bean.meta_image;
    model.metaImageName = bean.meta_image_name;
    model.isDefault = bean.is_default;
  }
)
// @dynamic
@ModelMapping(
  SiteNodeDetailInfoModel, SiteNodeDetailInfo,
  (model, bean) => {
    bean.language_id = model.languageId;
    bean.language_name = model.languageName;
    bean.node_name = model.nodeName;
    bean.meta_title = model.metaTitle;
    bean.meta_description = model.metaDescription;
    bean.meta_keyword = model.metaKeyword;
    bean.meta_image = model.metaImage;
    bean.meta_image_name = model.metaImageName;
    bean.is_default = model.isDefault;
  }
)
export class SiteNodeDetailInfoModel {

  @IsNotEmpty()
  public languageId: string;
  @IsNotEmpty()
  public languageName: string;
  @IsNotEmpty()
  public nodeName: string;
  public metaTitle: string;
  public metaDescription: string;
  public metaKeyword: string;
  public metaImage: string;
  public metaImageName: string;
  public isDefault: boolean;

}
