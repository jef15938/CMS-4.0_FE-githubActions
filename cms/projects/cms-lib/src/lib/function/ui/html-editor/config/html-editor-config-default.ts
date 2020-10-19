import { HtmlEditorConfig } from '../html-editor.interface';

export const HTML_EDITOR_CONFIG_DEFAULT: HtmlEditorConfig = {
  name: 'default',
  actionEnable: {
    FONT_STYLE: true,
    FONT_POSITON: true,
    LIST: true,
    INDENT: true,
    HIGHLIGHT: true,
    LINK: true,
    FILE: true,
    IMAGE: true,
    TABLE: true,
    YOUTUBE: true,
  },
};
