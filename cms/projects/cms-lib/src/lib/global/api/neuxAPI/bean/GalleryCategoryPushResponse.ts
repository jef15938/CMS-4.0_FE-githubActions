import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GalleryCategoryInfo } from './GalleryCategoryInfo';
import { GenerationHeader } from './GenerationHeader';
import { TypeFactory } from './../type-factory';


export class GalleryCategoryPushResponse {

  @Type(TypeFactory(GenerationHeader))
  @ValidateNested()
  public header: GenerationHeader;
  @Type(TypeFactory(GalleryCategoryInfo))
  @ValidateNested()
  public body: GalleryCategoryInfo;


}
