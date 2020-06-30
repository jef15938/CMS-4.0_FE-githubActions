import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TypeFactory } from '../type-factory';


export class SiteMapInfo {

  @IsNotEmpty()
  public node_id: string;
  @IsNotEmpty()
  public node_name: string;
  @IsNotEmpty()
  public canModify: boolean;
  @IsNotEmpty()
  public canSubmit: boolean;
  @Type(TypeFactory(SiteMapInfo))
  @ValidateNested()
  public children: Array<SiteMapInfo>;


}
