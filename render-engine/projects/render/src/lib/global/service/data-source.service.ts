import { Injectable } from '@angular/core';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { Observable, of } from 'rxjs';
import { ListDataSourceDataResponse } from '../api/neuxAPI/bean/ListDataSourceDataResponse';
import { ListDataSourceDataResponseModel } from '../api/data-model/models/list-data-source-data-response.model';
import { ModelMapper } from '@neux/core';

import * as download from './mock/download.json';
import * as news from './mock/news.json';
import * as qa from './mock/qa.json';
import * as slider from './mock/slider.json';

const mock = {
  download,
  news,
  qa,
  slider,
};

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @param {string} type
   * @param {string} id
   * @returns
   * @memberof DataSourceService
   */
  getDataSourceByTypeIDAndId<TData>(typeID: string, id: string): Observable<ListDataSourceDataResponseModel<TData>> {
    return of(mock[typeID]);
    return this.restAPIService.dispatchRestApi<ListDataSourceDataResponse>('GetDataSourceByTypeIDAndId', { typeID, id }).pipe(
      ModelMapper.rxMapModelTo(ListDataSourceDataResponseModel),
    );
  }

}
