import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CmsCanDeactiveGuardian } from '../interface/cms-candeactive-guardian.interface';

@Injectable()
export class CmsCanDeactiveGuard implements CanDeactivate<any> {

  private guardiansMap = new Map<CmsCanDeactiveGuardian, Subscription>();

  constructor(
    private readonly location: Location,
    private readonly router: Router,
  ) {

  }

  registerAsGuardian(guardian: CmsCanDeactiveGuardian) {
    if (!this.guardiansMap.has(guardian)) {
      const subscription = guardian.destroy$.subscribe(_ => {
        if (this.guardiansMap.has(guardian)) {
          subscription.unsubscribe();
          this.guardiansMap.delete(guardian);
        }
      });
      this.guardiansMap.set(guardian, subscription);
    }
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const guardians = Array.from(this.guardiansMap).map(([guardian, subscription]) => guardian).reverse();
    for (let i = 0, l = guardians.length; i < l; ++i) {
      const guardian = guardians[i];
      const can = guardian.canDeactivate(component, currentRoute, currentState, nextState);
      if (!can) {
        // https://stackoverflow.com/questions/46448133/candeactivate-changing-the-window-history
        const currentUrlTree = this.router.createUrlTree([], currentRoute);
        const currentUrl = currentUrlTree.toString();
        this.location.go(currentUrl);
        return false;
      }
    }
    return true;
  }

}
