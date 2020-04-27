import { Injectable } from '@angular/core';
import { RestApiService } from 'src/neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';
import { LoginRequest } from 'src/neuxAPI/bean/LoginRequest';
import { Observable } from 'rxjs';

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


  logout() {
    // TODO:check api spec
  }


}
