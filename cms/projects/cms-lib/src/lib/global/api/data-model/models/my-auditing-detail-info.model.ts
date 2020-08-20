import { IsNotEmpty } from 'class-validator';
import { MyAuditingDetailInfo } from '../../neuxAPI/bean/MyAuditingDetailInfo';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  MyAuditingDetailInfo, MyAuditingDetailInfoModel,
  (bean, model) => {
    model.auditingGroupName = bean.auditing_group_name;
    model.auditingStage = bean.auditing_stage;
    model.auditingName = bean.auditing_name;
    model.auditingDeptName = bean.auditing_dept_name;
    model.status = bean.status;
    model.auditingTime = bean.auditing_time;
    model.auditingComment = bean.auditing_comment;
  }
)
export class MyAuditingDetailInfoModel {

  @IsNotEmpty()
  public auditingGroupName: string;
  @IsNotEmpty()
  public auditingStage: number;
  public auditingName: string;
  public auditingDeptName: string;
  public status: string;
  public auditingTime: string;
  public auditingComment: string;

}
