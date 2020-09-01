import { Pipe, PipeTransform, Inject } from '@angular/core';
import { RENDER_ENVIROMENT_TOKEN } from '../injection-token/injection-token';
import { RenderEnvironment } from '../interface/render-environment.interface';

@Pipe({
  name: 'addResourceBaseUrl'
})
export class AddResourceBaseUrlPipe implements PipeTransform {

  constructor(
    @Inject(RENDER_ENVIROMENT_TOKEN) private enviroment: RenderEnvironment,
  ) { }

  transform(htmlString: string, args?: any): string {
    if (!htmlString) { return htmlString; }
    const div = document.createElement('div');
    div.innerHTML = htmlString;

    const galleryImgs = Array.from(div.querySelectorAll('img[gallery-id]')) as HTMLImageElement[];
    galleryImgs.forEach(galleryImg => {
      galleryImg.src = `${this.enviroment.resourceBaseUrl}${galleryImg.getAttribute('src')}`;
    });

    const galleryFiles = Array.from(div.querySelectorAll('a.gallery-file')) as HTMLAnchorElement[];
    galleryFiles.forEach(galleryFile => {
      galleryFile.href = `${this.enviroment.resourceBaseUrl}${galleryFile.getAttribute('href')}`;
    });

    return div.innerHTML || '';
  }

}
