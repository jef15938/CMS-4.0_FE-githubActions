import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';
import { MenuGetResponse } from '../neuxAPI/bean/MenuGetResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @returns
   * @memberof MenuService
   */
  getCMSMenu(): Observable<MenuGetResponse> {
    return this.restAPIService.dispatchRestApi('GetCMSMenu', {});
  }

  /**
   *
   *
   * @returns
   * @memberof MenuService
   */
  getUserMenu(): Observable<MenuGetResponse> {
    return this.restAPIService.dispatchRestApi('GetUserMenu', {});
  }
}
