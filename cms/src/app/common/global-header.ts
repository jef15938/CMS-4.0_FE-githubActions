import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHeader } from '@neux/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalHeader implements ApiHeader {
  /**
   * @returns Return headers for restful api
   */
  getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Date': new Date().toUTCString(),
      'X-Request-ID': Date.now().toString(),
    });
  }
}
