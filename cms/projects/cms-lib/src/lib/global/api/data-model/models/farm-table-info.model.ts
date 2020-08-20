import { ValidateNested, IsNotEmpty } from 'class-validator';
import { FarmTableInfo } from '../../neuxAPI/bean/FarmTableInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';
import { FarmTableDataInfoModel } from './farm-table-data-info.model';
import { PageInfoModel } from './page-info.model';

// @dynamic
@ModelMapping(
  FarmTableInfo, FarmTableInfoModel,
  (bean, model) => {
    model.pageInfo = ModelMapper.mapModelTo(PageInfoModel, bean.pageInfo);
    model.canCreate = bean.can_create;
    model.canCheckbox = bean.can_checkbox;
    model.datas = ModelMapper.mapArrayTo(FarmTableDataInfoModel, bean.datas);
  }
)
export class FarmTableInfoModel {

  @ValidateNested()
  @IsNotEmpty()
  public pageInfo: PageInfoModel;
  @IsNotEmpty()
  public canCreate: boolean;
  @IsNotEmpty()
  public canCheckbox: boolean;
  @ValidateNested()
  public datas: Array<FarmTableDataInfoModel>;

}
