import { RenderEnvironment } from '../interface/render-environment.interface';
import { isPlatformBrowser } from '@angular/common';

export class HtmlEditorUtil {

  static addResourceBaseUrlForHtml(
    htmlString: string,
    enviroment: RenderEnvironment,
    platformId: any,
  ) {
    if (!htmlString) { return htmlString; }

    const isBrowser = isPlatformBrowser(platformId);
    const resourceUrl = isBrowser ? enviroment.resourceBaseUrl : '';

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
