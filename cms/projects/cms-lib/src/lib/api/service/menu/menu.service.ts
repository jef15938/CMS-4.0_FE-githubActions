import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from '@cms-lib/neuxAPI/rest-api.service';
import { MenuGetResponse } from '@cms-lib/neuxAPI/bean/MenuGetResponse';
import { MenuInfo } from '@cms-lib/neuxAPI/bean/MenuInfo';

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
    return this.restAPIService.dispatchRestApi('GetCMSMenu', {}).pipe(
      map((res: MenuGetResponse) => res.datas)
    );
  }

  /**
   *
   *
   * @returns
   * @memberof MenuService
   */
  getUserMenu(): Observable<MenuInfo[]> {
    return this.restAPIService.dispatchRestApi('GetUserMenu', {}).pipe(
      map((res: MenuGetResponse) => res.datas)
    );
  }
}
