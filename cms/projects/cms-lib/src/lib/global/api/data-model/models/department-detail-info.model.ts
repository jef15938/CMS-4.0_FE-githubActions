import { IsNotEmpty } from 'class-validator';
import { DepartmentDetailInfo } from '../../neuxAPI/bean/DepartmentDetailInfo';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  DepartmentDetailInfo, DepartmentDetailInfoModel,
  (bean, model) => {
    model.deptId = bean.dept_id;
    model.deptName = bean.dept_name;
  }
)
export class DepartmentDetailInfoModel {

  @IsNotEmpty()
  public deptId: string;
  @IsNotEmpty()
  public deptName: string;

}
