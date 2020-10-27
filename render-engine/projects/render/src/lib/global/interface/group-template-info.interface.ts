import { ContentTemplateInfoModel } from '../api/data-model/models/content-template-info.model';
import { ContentFieldInfoModel } from '../api/data-model/models/content-field-info.model';

export interface GroupItem extends ContentFieldInfoModel {
  extension: {
    hideden: boolean;
  };
}

export interface GroupTemplateInfo extends ContentTemplateInfoModel {
  itemList: GroupItem[][];
  attributes: {
    maxItemCounts: number;
    itemDisplayFieldId: string;
  };
}
