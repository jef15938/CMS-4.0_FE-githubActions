import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TypeFactory } from '../type-factory';


export class GalleryCategoryInfo {

  @IsNotEmpty()
  public category_id: string;
  @IsNotEmpty()
  public category_name: string;
  @IsNotEmpty()
  public can_upload: boolean;
  @Type(TypeFactory(GalleryCategoryInfo))
  @ValidateNested()
  public children: Array<GalleryCategoryInfo>;


}
