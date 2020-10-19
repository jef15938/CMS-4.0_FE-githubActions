import { SiteMapLanguageInfo } from '../../neuxAPI/bean/SiteMapLanguageInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  SiteMapLanguageInfo, SiteMapLanguageInfoModel,
  (bean, model) => {
    model.languageId = bean.language_id;
    model.nodeName = bean.node_name;
  }
)
export class SiteMapLanguageInfoModel {

  public languageId: string;
  public nodeName: string;

}
