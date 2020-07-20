import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { FarmService } from '../api/service';

@Injectable()
export class CmsFarmDataResolver implements Resolve<any> {

  constructor(
    private farmService: FarmService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return route.params?.funcId ? this.farmService.getFarmByFuncID(route.params.funcId) : of(undefined);
  }
}
