import { IsNotEmpty } from 'class-validator';
import { AuditingInfo } from '../../neuxAPI/bean/AuditingInfo';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  AuditingInfo, AuditingInfoModel,
  (bean, model) => {
    model.orderId = bean.order_id;
    model.orderName = bean.order_name;
    model.version = bean.version;
    model.startTime = bean.start_time;
    model.endTime = bean.end_time;
    model.submitComment = bean.submit_comment;
    model.createName = bean.create_name;
  }
)
export class AuditingInfoModel {

  @IsNotEmpty()
  public orderId: number;
  @IsNotEmpty()
  public orderName: string;
  @IsNotEmpty()
  public version: number;
  @IsNotEmpty()
  public startTime: string;
  @IsNotEmpty()
  public endTime: string;
  public submitComment: string;
  @IsNotEmpty()
  public createName: string;

}
