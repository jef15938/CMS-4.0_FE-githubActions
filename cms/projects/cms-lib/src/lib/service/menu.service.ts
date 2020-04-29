import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';

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
  getCMSMenu() {
    return this.restAPIService.dispatchRestApi('GetCMSMenu', {});
  }

  /**
   *
   *
   * @returns
   * @memberof MenuService
   */
  getUserMenu() {
    return this.restAPIService.dispatchRestApi('GetUserMenu', {});
  }
}
