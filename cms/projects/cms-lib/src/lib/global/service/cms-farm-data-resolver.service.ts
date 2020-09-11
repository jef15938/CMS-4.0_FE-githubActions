import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { FarmService } from '../api/service';
import { CmsErrorHandler } from '../error-handling';

@Injectable()
export class CmsFarmDataResolver implements Resolve<any> {

  constructor(
    private farmService: FarmService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return route.params?.funcId ? this.farmService.getFarmByFuncID(route.params.funcId).pipe(
      CmsErrorHandler.rxHandleError(),
    ) : of(undefined);
  }
}
