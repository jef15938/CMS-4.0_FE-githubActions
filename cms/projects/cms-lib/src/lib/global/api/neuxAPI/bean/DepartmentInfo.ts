import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TypeFactory } from './../type-factory';


export class DepartmentInfo {

  @IsNotEmpty()
  public dept_id: string;
  @IsNotEmpty()
  public dept_name: string;
  @Type(TypeFactory(DepartmentInfo))
  @ValidateNested()
  @IsNotEmpty()
  public children: Array<DepartmentInfo>;


}
