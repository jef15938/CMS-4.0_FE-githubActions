import { IsNotEmpty } from 'class-validator';
import { ContentFieldInfo } from '../../neuxAPI/bean/ContentFieldInfo';
import { ModelMapping } from '../model-mapper';

export enum ContentFieldInfoFieldType {
  TEXT = 'TEXT',
  TEXTEREA = 'TEXTEREA',
  LINK = 'LINK',
  BGIMG = 'BGIMG',
  IMG = 'IMG',
  GROUP = 'GROUP',
  HTMLEDITOR = 'HTMLEDITOR',
}

// @dynamic
@ModelMapping(
  ContentFieldInfo, ContentFieldInfoModel,
  (bean, model) => {
    model.fieldId = bean.fieldId;
    model.fieldType = bean.fieldType as ContentFieldInfoFieldType;
    model.fieldVal = bean.fieldVal;
    model.extension = JSON.parse(JSON.stringify(bean.extension));
  }
)
export class ContentFieldInfoModel {

  @IsNotEmpty()
  public fieldId: string;
  @IsNotEmpty()
  public fieldType: ContentFieldInfoFieldType;
  @IsNotEmpty()
  public fieldVal: string;
  @IsNotEmpty()
  public extension: { [key: string]: string };

}
