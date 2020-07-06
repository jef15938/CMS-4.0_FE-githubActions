import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContentInfo } from '../interface';
import * as CONTENT from './render.service.mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor() { }

  getContentInfo(contentId: string): Observable<ContentInfo> {
    const content = CONTENT;
    // tslint:disable-next-line: no-string-literal
    return of(content['default']);
  }

}
