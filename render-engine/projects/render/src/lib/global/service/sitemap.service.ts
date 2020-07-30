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

  /**
   * 根據root node 跟language取得sitemap
   *
   * @param {string} root
   * @param {string} [lang=null]
   * @returns {Observable<any>}
   * @memberof SitemapService
   */
  getSitemap(context: 'preview' | 'runtime', root: string, lang: string = null): Observable<any> {
    if (!!lang) {
      return context === 'preview'
        ? this.apiService.dispatchRestApi('GetPreviewSiteMapByNodeIdAndLang', { node_id: root, lang })
        : this.apiService.dispatchRestApi('GetSiteMapByNodeIdAndLang', { node_id: root, lang });
    }
    return context === 'preview'
      ? this.apiService.dispatchRestApi('GetPreviewSiteMapByNodeId', { node_id: root })
      : this.apiService.dispatchRestApi('GetSiteMapByNodeId', { node_id: root });
  }
}
