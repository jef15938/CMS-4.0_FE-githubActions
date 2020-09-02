import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { MenuGetResponse } from '../../neuxAPI/bean/MenuGetResponse';
import { ModelMapper } from '@neux/core';
import { MenuInfoModel } from '../../data-model/models/menu-info.model';
import { MenuGetResponseModel } from '../../data-model/models/menu-get-response.model';
import { CmsApiServiceError } from '../../../error-handling/type/api-service/api-service-error';
import { CmsErrorHandler } from '../../../error-handling/cms-error-handler';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  error = new CmsApiServiceError({ name: 'MenuService' });

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
      CmsErrorHandler.rxMapError(this.error.setMessage('getCMSMenu')),
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
      CmsErrorHandler.rxMapError(this.error.setMessage('getUserMenu')),
      ModelMapper.rxMapModelTo(MenuGetResponseModel),
      map(res => res.datas),
    );
  }
}
