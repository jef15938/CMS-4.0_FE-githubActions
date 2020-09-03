import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { LoginRequest } from '../../neuxAPI/bean/LoginRequest';
import { LoginResponse } from '../../neuxAPI/bean/LoginResponse';
import { LoginInfoModel } from '../../data-model/models/login-info.model';
import { plainToClass } from 'class-transformer';
import { ModelMapper } from '@neux/core';
import { LoginResponseModel } from '../../data-model/models/login-response.model';
import { AuthorizationServiceError, CmsErrorHandler } from '../../../error-handling';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  error = new AuthorizationServiceError();

  constructor(
    private respAPIService: RestApiService,
  ) { }

  /**
   *
   *
   * @param {string} username required
   * @param {string} password required
   * @param {number} validation_code required
   * @returns
   * @memberof AuthorizationService
   */
  login(username: string, password: string, validationCode: number) {
    if (!username) { throw new ParamsError('username', 'login', 'string', username); }
    if (!password) { throw new ParamsError('password', 'login', 'string', password); }
    if (!validationCode) { throw new ParamsError('validationCode', 'login', 'number', validationCode); }

    const requestBody: LoginRequest = {
      username,
      password,
      validation_code: validationCode,
    };

    return this.respAPIService.dispatchRestApi('PostLogin', { requestBody }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('login')),
    );
  }

  /**
   *
   *
   * @returns
   * @memberof AuthorizationService
   */
  logout() {
    return this.respAPIService.dispatchRestApi('GetLogout', {}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('logout')),
    );
  }

  /**
   *
   *
   * @returns
   * @memberof AuthorizationService
   */
  getLoginInfo(): Observable<LoginInfoModel> {
    return this.respAPIService.dispatchRestApi<LoginResponse>('GetLoginInfo', {}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getLoginInfo')),
      ModelMapper.rxMapModelTo(LoginResponseModel),
      map(res => {
        localStorage.setItem('loginInfo', JSON.stringify(res.loginInfo));
        return res.loginInfo;
      }),
    );
  }

  getCurrentLoginInfo(): LoginInfoModel {
    try {
      const loginInfoString: string = localStorage.getItem('loginInfo');
      const loginInfo: LoginInfoModel = loginInfoString ? JSON.parse(loginInfoString) : null;
      return plainToClass(LoginInfoModel, loginInfo);
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'AuthorizationService.getCurrentLoginInfo()', '資料解析錯誤');
    }
    return null;
  }
}
