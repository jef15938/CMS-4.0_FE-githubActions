import { Injectable } from '@angular/core';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { Observable } from 'rxjs';
import { ListDataSourceDataResponse } from '../api/neuxAPI/bean/ListDataSourceDataResponse';
import { ListDataSourceDataResponseModel } from '../api/data-model/models/list-data-source-data-response.model';
import { ModelMapper } from '@neux/core';

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
    return this.restAPIService.dispatchRestApi<ListDataSourceDataResponse>('GetDataSourceByTypeIDAndId', { typeID, id }).pipe(
      ModelMapper.rxMapModelTo(ListDataSourceDataResponseModel),
    );
  }

}
