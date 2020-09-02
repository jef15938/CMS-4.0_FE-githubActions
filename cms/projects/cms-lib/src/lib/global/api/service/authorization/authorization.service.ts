import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, concatMap } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { LoginRequest } from '../../neuxAPI/bean/LoginRequest';
import { LoginResponse } from '../../neuxAPI/bean/LoginResponse';
import { Router } from '@angular/router';
import { LoginInfoModel } from '../../data-model/models/login-info.model';
import { plainToClass } from 'class-transformer';
import { ModelMapper } from '@neux/core';
import { LoginResponseModel } from '../../data-model/models/login-response.model';
import { CmsApiServiceError } from '../../../error-handling/type/api-service/api-service-error';
import { CmsErrorHandler } from '../../../error-handling/cms-error-handler';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  error = new CmsApiServiceError({ name: 'AuthorizationService' });

  constructor(
    private respAPIService: RestApiService,
    private router: Router,
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
      concatMap(_ => this.getLoginInfo()),
      tap(_ => this.router.navigate([''])),
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
      tap(_ => {
        localStorage.clear();
        this.router.navigate(['login']);
      }),
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
    const loginInfoString: string = localStorage.getItem('loginInfo');
    const loginInfo: LoginInfoModel = loginInfoString ? JSON.parse(loginInfoString) : null;
    return plainToClass(LoginInfoModel, loginInfo);
  }
}
