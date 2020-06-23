import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TemplateInfo } from './TemplateInfo';
import { TypeFactory } from '../type-factory';


export class TemplateGetResponse {

  @Type(TypeFactory(TemplateInfo))
  @ValidateNested()
  public static: Array<TemplateInfo>;
  @Type(TypeFactory(TemplateInfo))
  @ValidateNested()
  public tab: Array<TemplateInfo>;
  @Type(TypeFactory(TemplateInfo))
  @ValidateNested()
  public dynamic: Array<TemplateInfo>;
  @Type(TypeFactory(TemplateInfo))
  @ValidateNested()
  public customize: Array<TemplateInfo>;


}
