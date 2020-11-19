import { ModelMapping } from '@neux/core';
import { ShortCutObject } from '../../neuxAPI/bean/ShortCutObject';

// @dynamic
@ModelMapping(
  ShortCutObject, ShortCutObjectModel,
  (bean, model) => {
    model.title = bean.title;
    model.iconUrl = bean.icon_url;
    model.url = bean.url;
    model.urlBlank = bean.url_blank;
  }
)
export class ShortCutObjectModel {
  public title: string;
  public iconUrl: string;
  public url: string;
  public urlBlank: boolean;
}
