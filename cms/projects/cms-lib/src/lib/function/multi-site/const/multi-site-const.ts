import { SiteMapUrlType, SiteMapUrlBlankType, SiteMapNodeType, SiteMapNodeDeviceType, SiteMapUrlTypeName, SiteMapUrlBlankTypeName, SiteMapNodeTypeName, SiteMapNodeDeviceTypeName } from '../../../global/enum/multi-site.enum';

export const urlTypeOptions: { value: SiteMapUrlType, name: string }[] = [
  { value: SiteMapUrlType.INSIDE, name: SiteMapUrlTypeName.INSIDE },
  { value: SiteMapUrlType.OUTSIDE, name: SiteMapUrlTypeName.OUTSIDE },
];

export const urlTypes = {
  [SiteMapUrlType.INSIDE]: SiteMapUrlTypeName.INSIDE,
  [SiteMapUrlType.OUTSIDE]: SiteMapUrlTypeName.OUTSIDE,
};

export const urlBlankTypeOptions: { value: SiteMapUrlBlankType, name: string }[] = [
  { value: SiteMapUrlBlankType.YES, name: SiteMapUrlBlankTypeName.YES },
  { value: SiteMapUrlBlankType.NO, name: SiteMapUrlBlankTypeName.NO },
];

export const urlBlankTypes = {
  [SiteMapUrlBlankType.YES]: SiteMapUrlBlankTypeName.YES,
  [SiteMapUrlBlankType.NO]: SiteMapUrlBlankTypeName.NO,
};

export const nodeTypeOptions: { value: SiteMapNodeType, name: string }[] = [
  { value: SiteMapNodeType.NONE, name: SiteMapNodeTypeName.NONE },
  { value: SiteMapNodeType.URL, name: SiteMapNodeTypeName.URL },
  { value: SiteMapNodeType.CONTENT, name: SiteMapNodeTypeName.CONTENT },
];

export const nodeTypes = {
  [SiteMapNodeType.NONE]: SiteMapNodeTypeName.NONE,
  [SiteMapNodeType.URL]: SiteMapNodeTypeName.URL,
  [SiteMapNodeType.CONTENT]: SiteMapNodeTypeName.CONTENT,
};

export const deviceTypeOptions: { value: SiteMapNodeDeviceType, name: string }[] = [
  { value: SiteMapNodeDeviceType.ALL, name: SiteMapNodeDeviceTypeName.ALL },
  { value: SiteMapNodeDeviceType.PC, name: SiteMapNodeDeviceTypeName.PC },
  { value: SiteMapNodeDeviceType.PAD, name: SiteMapNodeDeviceTypeName.PAD },
  { value: SiteMapNodeDeviceType.MOBILE, name: SiteMapNodeDeviceTypeName.MOBILE },
];

export const deviceTypes = {
  [SiteMapNodeDeviceType.ALL]: SiteMapNodeDeviceTypeName.ALL,
  [SiteMapNodeDeviceType.MOBILE]: SiteMapNodeDeviceTypeName.MOBILE,
  [SiteMapNodeDeviceType.PAD]: SiteMapNodeDeviceTypeName.PAD,
  [SiteMapNodeDeviceType.PC]: SiteMapNodeDeviceTypeName.PC,
};
