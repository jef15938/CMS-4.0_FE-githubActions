import { Pipe, PipeTransform } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { ModelMapper } from '@neux/core';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { ContentInfo } from '../api/neuxAPI/bean/ContentInfo';

@Pipe({
  name: 'stringToContentInfoModel'
})
export class StringToContentInfoModelPipe implements PipeTransform {

  constructor() { }

  transform(value: string): ContentInfoModel {
    if (!value) { return null; }
    const contentInfoJSON = JSON.parse(value);
    const contentInfoBean = plainToClass(ContentInfo, contentInfoJSON);
    const contentInfoModel = ModelMapper.mapModelTo(ContentInfoModel, contentInfoBean);
    return contentInfoModel;
  }

}
