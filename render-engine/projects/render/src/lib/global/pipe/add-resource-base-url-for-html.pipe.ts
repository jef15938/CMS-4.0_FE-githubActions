import { Pipe, PipeTransform, Inject, PLATFORM_ID } from '@angular/core';
import { RENDER_ENVIROMENT_TOKEN } from '../injection-token/injection-token';
import { RenderEnvironment } from '../interface/render-environment.interface';
import { HtmlEditorUtil } from '../utils/html-editor-util';

@Pipe({
  name: 'addResourceBaseUrlForHtml'
})
export class AddResourceBaseUrlForHtmlPipe implements PipeTransform {

  constructor(
    @Inject(RENDER_ENVIROMENT_TOKEN) private enviroment: RenderEnvironment,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  transform(htmlString: string, args?: any): string {
    return HtmlEditorUtil.addResourceBaseUrlForHtml(htmlString, this.enviroment, this.platformId);
  }

}
