import { Injectable } from '@angular/core';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { Observable } from 'rxjs';
import { ListDataSourceDataResponse } from '../api/neuxAPI/bean/ListDataSourceDataResponse';
import { map } from 'rxjs/operators';

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
  getDataSourceByTypeIDAndId(typeID: string, id: string): Observable<any[]> {
    return this.restAPIService.dispatchRestApi<ListDataSourceDataResponse>('GetDataSourceByTypeIDAndId', { typeID, id }).pipe(
      map(res => res.datas)
    );
  }

}
