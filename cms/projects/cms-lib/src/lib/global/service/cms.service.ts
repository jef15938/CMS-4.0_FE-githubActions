import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Cms {

  private authorized = false;

  private authorizationChange$ = new BehaviorSubject({ authorized: this.authorized, reason: '' });

  public setAuthorized(authorized: boolean, reason = '') {
    this.authorized = authorized;
    this.authorizationChange$.next({ authorized, reason });
  }

  public onAuthorizationChange() {
    return this.authorizationChange$.asObservable();
  }
}
