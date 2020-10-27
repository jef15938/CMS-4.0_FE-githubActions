import { Pipe, PipeTransform, Inject, PLATFORM_ID } from '@angular/core';
import { RENDER_ENVIROMENT_TOKEN } from '../injection-token/injection-token';
import { RenderEnvironment } from '../interface/render-environment.interface';
import { isPlatformBrowser } from '@angular/common';

@Pipe({
  name: 'addResourceBaseUrlForHtml'
})
export class AddResourceBaseUrlForHtmlPipe implements PipeTransform {

  constructor(
    @Inject(RENDER_ENVIROMENT_TOKEN) private enviroment: RenderEnvironment,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  transform(htmlString: string, args?: any): string {
    if (!htmlString) { return htmlString; }

    const isBrowser = isPlatformBrowser(this.platformId);
    const resourceUrl = isBrowser ? this.enviroment.resourceBaseUrl : '';

    const div = document.createElement('div');
    div.innerHTML = htmlString;

    const galleryImgs = Array.from(div.querySelectorAll('img[gallery-id]')) as HTMLImageElement[];
    galleryImgs.forEach(galleryImg => {
      galleryImg.src = `${resourceUrl}${galleryImg.getAttribute('src')}`;
    });

    const galleryFiles = Array.from(div.querySelectorAll('a.gallery-file')) as HTMLAnchorElement[];
    galleryFiles.forEach(galleryFile => {
      galleryFile.href = `${resourceUrl}${galleryFile.getAttribute('href')}`;
    });

    return div.innerHTML || '';
  }

}
