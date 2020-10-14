import { HtmlEditorConfig } from '../html-editor.interface';

export const HTML_EDITOR_CONFIG_ONLY_HIGHLIGHT: HtmlEditorConfig = {
  name: 'only-highlight',
  actionEnable: {
    FONT_STYLE: false,
    FONT_POSITON: false,
    LIST: false,
    INDENT: false,
    HIGHLIGHT: true,
    LINK: false,
    FILE: false,
    IMAGE: false,
    TABLE: false,
    YOUTUBE: false,
  },
};
