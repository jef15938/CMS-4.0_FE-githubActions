import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DepartmentService } from './../../../../service/department.service';

@Injectable()
export class DeptListResolver implements Resolve<any> {
  constructor(
    private _departmentService: DepartmentService,
  ) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._departmentService.getAllDepartment();
  }
}