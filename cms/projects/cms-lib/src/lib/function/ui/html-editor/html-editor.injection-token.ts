import { InjectionToken } from '@angular/core';
import { HtmlEditorConfig } from './html-editor.interface';

export const HTML_EDITOR_CONFIG_TOKEN
  = new InjectionToken<HtmlEditorConfig>('HTML_EDITOR_CONFIG_TOKEN');
