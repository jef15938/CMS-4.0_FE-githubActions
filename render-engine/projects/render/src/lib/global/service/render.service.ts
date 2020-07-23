import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContentInfo } from '../interface';
import * as CONTENT from './render.service.mock-data.json';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { PageInfo } from '../interface/page-info.interface';


@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor(
    private apiService: RestApiService
  ) { }

  getContentInfo(pageID: string): Observable<PageInfo> {

    // TODO: convert to PageInfo format
    // return this.apiService.dispatchRestApi('GetPageByPageID', { pageID });
    const content = CONTENT;
    // tslint:disable-next-line: no-string-literal
    return of(content['default']);
  }

}
