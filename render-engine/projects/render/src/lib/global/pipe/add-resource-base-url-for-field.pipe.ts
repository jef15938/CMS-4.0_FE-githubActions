import { Pipe, PipeTransform, Inject, PLATFORM_ID } from '@angular/core';
import { RENDER_ENVIROMENT_TOKEN } from '../injection-token/injection-token';
import { RenderEnvironment } from '../interface/render-environment.interface';
import { isPlatformBrowser } from '@angular/common';

@Pipe({
  name: 'addResourceBaseUrlForField'
})
export class AddResourceBaseUrlForFieldPipe implements PipeTransform {

  constructor(
    @Inject(RENDER_ENVIROMENT_TOKEN) private enviroment: RenderEnvironment,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  transform(fieldValue: string, args?: any): string {
    if (!fieldValue) { return fieldValue; }

    const isBrowser = isPlatformBrowser(this.platformId);
    const resourceUrl = isBrowser ? this.enviroment.resourceBaseUrl : '';

    return `${resourceUrl}${fieldValue}`;
  }

}
