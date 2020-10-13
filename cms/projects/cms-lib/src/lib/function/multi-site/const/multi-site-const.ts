import {
  SiteMapUrlType, SiteMapUrlBlankType, SiteMapNodeType, SiteMapNodeDeviceType,
  SiteMapUrlTypeName, SiteMapUrlBlankTypeName, SiteMapNodeTypeName, SiteMapNodeDeviceTypeName,
} from '../../../global/enum/multi-site.enum';

export class MultiSiteConst {
  static readonly urlTypeOptions: { value: SiteMapUrlType, name: string }[] = [
    { value: SiteMapUrlType.INSIDE, name: SiteMapUrlTypeName.INSIDE },
    { value: SiteMapUrlType.OUTSIDE, name: SiteMapUrlTypeName.OUTSIDE },
  ];

  static readonly urlBlankTypeOptions: { value: SiteMapUrlBlankType, name: string }[] = [
    { value: SiteMapUrlBlankType.YES, name: SiteMapUrlBlankTypeName.YES },
    { value: SiteMapUrlBlankType.NO, name: SiteMapUrlBlankTypeName.NO },
  ];

  static readonly nodeTypeOptions: { value: SiteMapNodeType, name: string }[] = [
    { value: SiteMapNodeType.NONE, name: SiteMapNodeTypeName.NONE },
    { value: SiteMapNodeType.URL, name: SiteMapNodeTypeName.URL },
    { value: SiteMapNodeType.CONTENT, name: SiteMapNodeTypeName.CONTENT },
  ];

  static readonly deviceTypeOptions: { value: SiteMapNodeDeviceType, name: string }[] = [
    { value: SiteMapNodeDeviceType.ALL, name: SiteMapNodeDeviceTypeName.ALL },
    { value: SiteMapNodeDeviceType.PC, name: SiteMapNodeDeviceTypeName.PC },
    { value: SiteMapNodeDeviceType.PAD, name: SiteMapNodeDeviceTypeName.PAD },
    { value: SiteMapNodeDeviceType.MOBILE, name: SiteMapNodeDeviceTypeName.MOBILE },
  ];
}
