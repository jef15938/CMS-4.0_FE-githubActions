import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Cms {

  private authorized = false;

  private authorizationChange$ = new BehaviorSubject(this.authorized);

  public setAuthorized(authorized: boolean) {
    this.authorized = authorized;
    this.authorizationChange$.next(this.authorized);
  }

  public onAuthorizationChange() {
    return this.authorizationChange$.asObservable();
  }
}
