import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { TypeFactory } from '../type-factory';

enum FieldType {
  TEXT = 'TEXT',
  TEXTEREA = 'TEXTEREA',
  LINK = 'LINK',
  BGIMG = 'BGIMG',
  IMG = 'IMG',
  GROUP = 'GROUP',
  HTMLEDITOR = 'HTMLEDITOR',
}

export class ContentFieldInfo {

  @IsNotEmpty()
  public fieldId: string;
  @IsNotEmpty()
  public fieldType: FieldType;
  @IsNotEmpty()
  public fieldVal: string;
  @IsNotEmpty()
  public extension: { [key: string]: string };


}
