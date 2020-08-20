import { LayoutInfo } from '../../neuxAPI/bean/LayoutInfo';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  LayoutInfo, LayoutInfoModel,
  (bean, model) => {
    model.layoutId = bean.layout_id;
    model.layoutName = bean.layout_name;
    model.layoutThumbnail = bean.layout_thumbnail;
  }
)
export class LayoutInfoModel {

  public layoutId: string;
  public layoutName: string;
  public layoutThumbnail: string;

}
