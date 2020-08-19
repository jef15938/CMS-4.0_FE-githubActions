import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { MenuGetResponse } from '../../neuxAPI/bean/MenuGetResponse';
import { ModelMapper } from '../../data-model/model-mapper';
import { MenuInfoModel } from '../../data-model/models/menu-info.model';
import { MenuGetResponseModel } from '../../data-model/models/menu-get-response.model';

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
  getCMSMenu(): Observable<MenuInfoModel[]> {
    return this.restAPIService.dispatchRestApi<MenuGetResponse>('GetCMSMenu', {}).pipe(
      ModelMapper.rxMapModelTo(MenuGetResponseModel),
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @returns
   * @memberof MenuService
   */
  getUserMenu(): Observable<MenuInfoModel[]> {
    return this.restAPIService.dispatchRestApi<MenuGetResponse>('GetUserMenu', {}).pipe(
      ModelMapper.rxMapModelTo(MenuGetResponseModel),
      map(res => res.datas),
    );
  }
}
