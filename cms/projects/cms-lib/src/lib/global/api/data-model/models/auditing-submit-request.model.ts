import { IsNotEmpty } from 'class-validator';
import { AuditingSubmitRequest } from '../../neuxAPI/bean/AuditingSubmitRequest';
import { ModelMapping } from '../model-mapper';

// @dynamic
@ModelMapping(
  AuditingSubmitRequest, AuditingSubmitRequestModel,
  (bean, model) => {
    model.status = bean.status;
    model.comment = bean.comment;
  }
)
export class AuditingSubmitRequestModel {

  @IsNotEmpty()
  public status: string;
  public comment: string;

}
