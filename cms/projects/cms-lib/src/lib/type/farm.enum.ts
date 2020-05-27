export enum CmsFarmFormColumnDisplayType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  DATE = 'DATE',
  GALLERY = 'GALLERY',
  EDITOR = 'EDITOR',
  HTMLEDITOR = 'HTMLEDITOR',
  DATETIME = 'DATETIME',
  TREE = 'TREE',
  LABEL = 'LABEL',
}

export enum CmsFarmTableColumnDisplayType {
  LABEL = 'LABEL',
  LINK = 'LINK',
}

export enum CmsFarmFormColumnTriggerType {
  DATATRIGGER = 'DATATRIGGER',
  ENABLETRIGGER = 'ENABLETRIGGER',
  READONLYTRIGGER = 'READONLYTRIGGER',
  REQUIREDTRIGGER = 'REQUIREDTRIGGER',
}

export enum CmsFarmTableDataAction {
  CREATE = "create",
  MODIFY = "modify",
  PREVIEW = "preview",
  AUDITING = "auditing",
  DETAIL = "detail"
}