import { Injectable } from '@angular/core';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { Observable } from 'rxjs';
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
  getDataSourceByTypeIDAndId<TData>(typeId: string, id: string): Observable<ListDataSourceDataResponseModel<TData>> {
    return this.restAPIService.ListDataSourceData({ type_id: typeId, id }).pipe(
      ModelMapper.rxMapModelTo(ListDataSourceDataResponseModel),
    );
  }

}
