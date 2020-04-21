import { Injectable } from '@angular/core';
import { RestApiService } from 'src/neuxAPI/rest-api.service';
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
   * @param {string} userID
   * @returns
   * @memberof MenuService
   */
  getMenu(userID: string) {
    if (!userID) {
      throw new ParamsError('userID', 'getMenu', 'string', 'userID');
    }
    return this.restAPIService.dispatchRestApi('GetMenuByUserID', { UserID: userID });
  }
}
