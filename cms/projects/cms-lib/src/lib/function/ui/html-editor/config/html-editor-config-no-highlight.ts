import { HtmlEditorConfig } from '../html-editor.interface';

export const HTML_EDITOR_CONFIG_NO_HIGHLIGHT: HtmlEditorConfig = {
  name: 'no-highlight',
  actionEnable: {
    FONT_STYLE: true,
    FONT_POSITON: true,
    LIST: true,
    INDENT: true,
    HIGHLIGHT: false,
    LINK: true,
    FILE: true,
    IMAGE: true,
    TABLE: true,
    YOUTUBE: true,
  },
};
