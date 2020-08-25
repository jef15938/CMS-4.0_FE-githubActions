import { ValidateNested } from 'class-validator';
import { TemplateGetResponse } from '../../neuxAPI/bean/TemplateGetResponse';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { TemplateInfoModel } from './template-info.model';

// @dynamic
@ModelMapping(
  TemplateGetResponse, TemplateGetResponseModel,
  (bean, model) => {
    model.static = ModelMapper.mapArrayTo(TemplateInfoModel, bean.static);
    model.tab = ModelMapper.mapArrayTo(TemplateInfoModel, bean.tab);
    model.dynamic = ModelMapper.mapArrayTo(TemplateInfoModel, bean.dynamic);
    model.customize = ModelMapper.mapArrayTo(TemplateInfoModel, bean.customize);
  }
)
export class TemplateGetResponseModel {

  @ValidateNested()
  public static: Array<TemplateInfoModel>;
  @ValidateNested()
  public tab: Array<TemplateInfoModel>;
  @ValidateNested()
  public dynamic: Array<TemplateInfoModel>;
  @ValidateNested()
  public customize: Array<TemplateInfoModel>;

}
