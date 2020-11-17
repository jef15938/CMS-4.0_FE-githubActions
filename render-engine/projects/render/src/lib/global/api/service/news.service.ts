import { Injectable } from '@angular/core';
import { ModelMapper } from '@neux/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { NewsDetailResponseModel } from '../data-model/models/news-detail-response-model';
import { DetailObjectModel } from '../data-model/models/detail-object-model';

@Injectable({ providedIn: 'root' })

export class NewsService {
  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   * @param {string} id
   * @returns
   * @memberof NewsService
   */
  GetNewsDetailByNewsId(newsID: string): Observable<DetailObjectModel> {
    return this.restAPIService.GetNewsDetailByNewsId({ news_id: newsID }).pipe(
      ModelMapper.rxMapModelTo(NewsDetailResponseModel),
      map(x => x.data),
    );
  }
}
