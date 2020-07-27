import { Injectable } from '@angular/core';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  constructor(
    private apiService: RestApiService
  ) { }

  getSitemap(root: string, lang: string = null): Observable<any> {
    if (!!lang) {
      return this.apiService.dispatchRestApi('GetSiteMapByNodeIdAndLang', { node_id: root, lang });
    }
    return this.apiService.dispatchRestApi('GetSiteMapByNodeId', { node_id: root });
  }
}
