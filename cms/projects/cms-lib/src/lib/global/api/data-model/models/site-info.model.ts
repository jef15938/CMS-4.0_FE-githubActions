import { IsNotEmpty } from 'class-validator';
import { SiteInfo } from '../../neuxAPI/bean/SiteInfo';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  SiteInfo, SiteInfoModel,
  (bean, model) => {
    model.siteId = bean.site_id;
    model.siteName = bean.site_name;
  }
)
export class SiteInfoModel {

  @IsNotEmpty()
  public siteId: string;
  @IsNotEmpty()
  public siteName: string;

}
