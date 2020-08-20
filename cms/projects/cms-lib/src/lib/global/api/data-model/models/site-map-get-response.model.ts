import { ValidateNested, IsNotEmpty } from 'class-validator';
import { SiteMapGetResponse } from '../../neuxAPI/bean/SiteMapGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';

// @dynamic
@ModelMapping(
  SiteMapGetResponse, SiteMapGetResponseModel,
  (bean, model) => {
    model.nodeId = bean.node_id;
    model.nodeName = bean.node_name;
    model.canModify = bean.canModify;
    model.canSubmit = bean.canSubmit;
    model.canPreview = bean.canPreview;
    model.canAdd = bean.canAdd;
    model.canDelete = bean.canDelete;
    model.canOrder = bean.canOrder;
    model.children = ModelMapper.mapArrayTo(SiteMapGetResponseModel, bean.children);
  }
)
export class SiteMapGetResponseModel {

  @IsNotEmpty()
  public nodeId: string;
  @IsNotEmpty()
  public nodeName: string;
  @IsNotEmpty()
  public canModify: boolean;
  @IsNotEmpty()
  public canSubmit: boolean;
  @IsNotEmpty()
  public canPreview: boolean;
  @IsNotEmpty()
  public canAdd: boolean;
  @IsNotEmpty()
  public canDelete: boolean;
  public canOrder: boolean;
  @ValidateNested()
  public children: Array<SiteMapGetResponseModel>;

}
