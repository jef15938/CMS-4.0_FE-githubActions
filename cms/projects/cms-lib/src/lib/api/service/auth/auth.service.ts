import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsError } from '@neux/core';
import { RestApiService } from './../../../neuxAPI/rest-api.service';
import { LoginRequest } from './../../../neuxAPI/bean/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private restAPIService: RestApiService,
  ) { }

  /**
   *
   *
   * @returns
   * @memberof AuthService
   */
  getLoginInfo() {
    return this.restAPIService.dispatchRestApi('GetLoginInfo', {});
  }

  /**
   *
   *
   * @param {string} username
   * @param {string} passord
   * @param {number} validationCode Validation code in picture.
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  login(username: string, passord: string, validationCode: number): Observable<any> {
    // params validation
    if (!username) {
      throw new ParamsError('username', 'login', 'string', username);
    }
    if (!passord) {
      throw new ParamsError('passord', 'login', 'string', passord);
    }
    if (!validationCode) {
      throw new ParamsError('validationCode', 'login', 'number', validationCode);
    }
    const loginRequest = new LoginRequest();
    loginRequest.username = username;
    loginRequest.password = passord;
    loginRequest.validation_code = validationCode;
    return this.restAPIService.dispatchRestApi('PostLoginAPI', { requestBody: loginRequest });
  }

  /**
   *
   *
   * @returns
   * @memberof AuthService
   */
  logout() {
    return this.restAPIService.dispatchRestApi('GetLogout', {});
  }


}
