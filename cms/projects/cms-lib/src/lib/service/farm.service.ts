import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { Observable } from 'rxjs';
import { FarmInfo } from '../type/farm.class';
import { ParamsError } from '@neux/core';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @param {string} contentID // SiteMapInfo.layout_id
   * @returns
   * @memberof ContentService
   */
  getFarmByFuncID(funcID: string): Observable<FarmInfo> {
    if (!funcID) {
      throw new ParamsError('funcID', 'getFarmByFuncID', 'string', funcID);
    }
    return this.restAPIService.dispatchRestApi('GetFarmByFuncID', { funcID });;
  }
  
}
