import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';
import { LoginRequest } from '../neuxAPI/bean/LoginRequest';
import { LoginInfo } from '../neuxAPI/bean/LoginInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private respAPIService: RestApiService
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
  login(username: string, password: string, validation_code: number) {
    if (!username) { throw new ParamsError('username', 'login', 'string', username); }
    if (!password) { throw new ParamsError('password', 'login', 'string', password); }
    if (!validation_code) { throw new ParamsError('validation_code', 'login', 'string', validation_code); }

    const params: LoginRequest = {
      username,
      password,
      validation_code
    };

    return this.respAPIService.dispatchRestApi('PostLogin', params);
  }

  /**
   *
   *
   * @returns
   * @memberof AuthorizationService
   */
  logout() {
    return this.respAPIService.dispatchRestApi('GetLogout', {});
  }

  /**
   *
   *
   * @returns
   * @memberof AuthorizationService
   */
  getLoginInfo(): Observable<LoginInfo> {
    return this.respAPIService.dispatchRestApi('GetLoginInfo', {});
  }
}
