import { Injectable } from '@angular/core';
import { ContentInfo } from '@layout';
import * as CONTENT from './render.service.mock-data.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor() { }

  getContentInfo(contentId: string): Observable<ContentInfo> {
    const content = CONTENT;
    return of(content['default']);
  }

}
