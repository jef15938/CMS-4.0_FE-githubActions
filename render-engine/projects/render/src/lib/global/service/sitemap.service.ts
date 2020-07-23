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

  getSitemap(): Observable<any> {
    return this.apiService.dispatchRestApi('GetSiteMap', {});
  }
}
