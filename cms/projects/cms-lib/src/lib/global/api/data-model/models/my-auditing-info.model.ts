import { IsNotEmpty } from 'class-validator';
import { MyAuditingInfo } from '../../neuxAPI/bean/MyAuditingInfo';
import { ModelMapping } from '@neux/core';

// @dynamic
@ModelMapping(
  MyAuditingInfo, MyAuditingInfoModel,
  (bean, model) => {
    model.orderId = bean.order_id;
    model.orderName = bean.order_name;
    model.status = bean.status;
    model.startTime = bean.start_time;
    model.endTime = bean.end_time;
    model.version = bean.version;
  }
)
export class MyAuditingInfoModel {

  @IsNotEmpty()
  public orderId: number;
  @IsNotEmpty()
  public orderName: string;
  @IsNotEmpty()
  public status: string;
  @IsNotEmpty()
  public startTime: string;
  @IsNotEmpty()
  public endTime: string;
  @IsNotEmpty()
  public version: string;

}
