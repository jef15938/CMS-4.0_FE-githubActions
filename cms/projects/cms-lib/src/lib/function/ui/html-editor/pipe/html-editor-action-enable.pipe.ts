import { Pipe, PipeTransform } from '@angular/core';
import { HtmlEditorConfig } from '../html-editor.interface';
import { HtmlEditorAction } from '../actions/action.interface';

@Pipe({
  name: 'htmlEditorActionEnable'
})
export class HtmlEditorActionEnablePipe implements PipeTransform {

  constructor() { }

  transform(config: HtmlEditorConfig, action: HtmlEditorAction): boolean {
    return config.actionEnable[action.category];
  }

}
