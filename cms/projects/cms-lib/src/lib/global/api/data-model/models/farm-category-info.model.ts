import { ValidateNested, IsNotEmpty } from 'class-validator';
import { FarmCategoryInfo } from '../../neuxAPI/bean/FarmCategoryInfo';
import { ModelMapping, ModelMapper } from '@neux/core';
import { FarmFormInfoModel } from './farm-form-info.model';
import { FarmTableInfoModel } from './farm-table-info.model';

// @dynamic
@ModelMapping(
  FarmCategoryInfo, FarmCategoryInfoModel,
  (bean, model) => {
    model.categoryId = bean.category_id;
    model.categoryName = bean.category_name;
    model.searchInfo = bean.searchInfo ? ModelMapper.mapModelTo(FarmFormInfoModel, bean.searchInfo) : null;
    model.tableInfo = bean.tableInfo ? ModelMapper.mapModelTo(FarmTableInfoModel, bean.tableInfo) : null;
  }
)
export class FarmCategoryInfoModel {

  @IsNotEmpty()
  public categoryId: string;
  @IsNotEmpty()
  public categoryName: string;
  @ValidateNested()
  public searchInfo: FarmFormInfoModel;
  @ValidateNested()
  public tableInfo: FarmTableInfoModel;

}
