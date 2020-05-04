import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { MenuGetResponse } from '../neuxAPI/bean/MenuGetResponse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuInfo } from '../neuxAPI/bean/MenuInfo';

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
  getCMSMenu(): Observable<MenuInfo[]> {
    return (this.restAPIService.dispatchRestApi('GetCMSMenu', {}) as Observable<MenuGetResponse>).pipe(
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @returns
   * @memberof MenuService
   */
  getUserMenu(): Observable<MenuInfo[]> {
    return (this.restAPIService.dispatchRestApi('GetUserMenu', {}) as Observable<MenuGetResponse>).pipe(
      map(res => res.datas)
    );
  }
}
