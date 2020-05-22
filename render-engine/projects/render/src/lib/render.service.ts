import { Injectable } from '@angular/core';
import { ContentInfo } from '@layout';
import * as CONTENT from './render.service.mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor() { }

  getContentInfo(pageId: string): ContentInfo {
    return CONTENT as ContentInfo;
  }

}
