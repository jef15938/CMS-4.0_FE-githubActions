import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap, concatMap } from 'rxjs/operators';

import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { LoginRequest } from '../../neuxAPI/bean/LoginRequest';
import { LoginInfo } from '../../neuxAPI/bean/LoginInfo';
import { LoginResponse } from '../../neuxAPI/bean/LoginResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

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
  getLoginInfo(): Observable<LoginInfo> {
    return this.respAPIService.dispatchRestApi('GetLoginInfo', {}).pipe(
      map((loginResponse: LoginResponse) => {
        localStorage.setItem('loginInfo', JSON.stringify(loginResponse.loginInfo));
        return loginResponse.loginInfo;
      }),
    );
  }

  getCurrentLoginInfo(): LoginInfo {
    let loginInfo: any = localStorage.getItem('loginInfo');
    loginInfo = loginInfo ? JSON.parse(loginInfo) : null;
    return loginInfo;
  }
}
