import { IsNotEmpty } from 'class-validator';
import { PageInfoGetResponse } from '../../neuxAPI/bean/PageInfoGetResponse';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  PageInfoGetResponse, PageInfoGetResponseModel,
  (bean, model) => {
    model.layoutId = bean.layout_id;
    model.metaTitle = bean.meta_title;
    model.metaDescription = bean.meta_description;
    model.metaKeyword = bean.meta_keyword;
    model.metaImage = bean.meta_image;
    model.contentId = bean.content_id;
    model.lang = bean.lang;
    model.nodeRoot = bean.node_root;
  }
)
export class PageInfoGetResponseModel {

  @IsNotEmpty()
  public layoutId: string;
  @IsNotEmpty()
  public metaTitle: string;
  public metaDescription: string;
  public metaKeyword: string;
  public metaImage: string;
  @IsNotEmpty()
  public contentId: string;
  @IsNotEmpty()
  public lang: string;
  @IsNotEmpty()
  public nodeRoot: string;

}
