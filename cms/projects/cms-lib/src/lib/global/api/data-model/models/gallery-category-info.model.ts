import { IsNotEmpty, ValidateNested } from 'class-validator';
import { GalleryCategoryInfo } from '../../neuxAPI/bean/GalleryCategoryInfo';
import { ModelMapping, ModelMapper } from '@neux/core';

// @dynamic
@ModelMapping(
  GalleryCategoryInfo, GalleryCategoryInfoModel,
  (bean, model) => {
    model.categoryId = bean.category_id;
    model.categoryName = bean.category_name;
    model.canUpload = bean.can_upload;
    model.assignDeptId = bean.assign_dept_id;
    model.children = ModelMapper.mapArrayTo(GalleryCategoryInfoModel, bean.children);
  }
)
export class GalleryCategoryInfoModel {

  @IsNotEmpty()
  public categoryId: string;
  @IsNotEmpty()
  public categoryName: string;
  @IsNotEmpty()
  public canUpload: boolean;
  public assignDeptId: string;
  @ValidateNested()
  public children: Array<GalleryCategoryInfoModel>;

}
