import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { MenuInfoModel } from '../../data-model/models/menu-info.model';
import { MenuGetResponseModel } from '../../data-model/models/menu-get-response.model';
import { MenuServiceError, CmsErrorHandler } from '../../../error-handling';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  error = new MenuServiceError();

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
    return this.restAPIService.GetCMSMenu({}).pipe(
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
    return this.restAPIService.GetUserMenu({}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getUserMenu')),
      ModelMapper.rxMapModelTo(MenuGetResponseModel),
      map(res => res.datas),
    );
  }
}
