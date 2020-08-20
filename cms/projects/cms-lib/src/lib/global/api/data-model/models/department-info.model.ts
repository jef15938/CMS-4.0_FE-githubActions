import { IsNotEmpty, ValidateNested } from 'class-validator';
import { DepartmentInfo } from '../../neuxAPI/bean/DepartmentInfo';
import { ModelMapping, ModelMapper } from '../model-mapper';

// @dynamic
@ModelMapping(
  DepartmentInfo, DepartmentInfoModel,
  (bean, model) => {
    model.deptId = bean.dept_id;
    model.deptName = bean.dept_name;
    model.children = ModelMapper.mapArrayTo(DepartmentInfoModel, bean.children);
  }
)
export class DepartmentInfoModel {

  @IsNotEmpty()
  public deptId: string;
  @IsNotEmpty()
  public deptName: string;
  @ValidateNested()
  @IsNotEmpty()
  public children: Array<DepartmentInfoModel>;

}
