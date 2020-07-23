import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { TypeFactory } from '../type-factory';

export class PageInfoGetResponse {

  @IsNotEmpty()
  public layout_id: string;
  @IsNotEmpty()
  public meta_title: string;
  public meta_description: string;
  public meta_keyword: string;
  public meta_image: string;
  @IsNotEmpty()
  public content: string;


}
