import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';
import { Observable, of } from 'rxjs';
import { DepartmentInfo } from '../neuxAPI/bean/DepartmentInfo';
import { map } from 'rxjs/operators';
import { DepartmentGetResponse } from '../neuxAPI/bean/DepartmentGetResponse';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @param {string} deptID
   * @param {string} deptName
   * @param {string} [parentID] parent dept ID (should not pass if root level)
   * @returns
   * @memberof DepartmentService
   */
  createDepartment(deptID: string, deptName: string, parentID?: string) {
    if (!deptID) {
      throw new ParamsError('deptID', 'createDepartment', 'string', deptID);
    }
    if (!deptName) {
      throw new ParamsError('deptName', 'createDepartment', 'string', deptName);
    }

    const params: { [k: string]: any } = {
      deptID,
      dept_name: deptName
    };
    if (parentID) {
      params.parent_id = parentID;
    }

    return of(undefined);
    return this.restAPIService.dispatchRestApi('PostDepartmentByDeptID', params);
  }

  /**
   *
   *
   * @param {string} deptID
   * @returns
   * @memberof DepartmentService
   */
  deleteDepartment(deptID: string) {
    if (!deptID) {
      throw new ParamsError('deptID', 'createDepartment', 'string', deptID);
    }

    return of(undefined);
    return this.restAPIService.dispatchRestApi('DeleteDepartmentByDeptID', { deptID });
  }

  /**
   *
   *
   * @returns
   * @memberof DepartmentService
   */
  getAllDepartment(): Observable<DepartmentInfo[]> {
    return (this.restAPIService.dispatchRestApi('GetDepartment', {}) as Observable<DepartmentGetResponse>).pipe(
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @param {string} deptID
   * @returns
   * @memberof DepartmentService
   */
  getDepartmentByID(deptID: string): Observable<DepartmentInfo> {
    if (!deptID) {
      throw new ParamsError('deptID', 'getDepartmentByID', 'string', deptID);
    }
    return this.getAllDepartment().pipe(
      map(depts => this._getDeptFromAllById(deptID, depts))
    );
  }

  private _getDeptFromAllById(id: string, all: DepartmentInfo[]): DepartmentInfo {
    if (!all || !all.length) {
      return null;
    }
    const dept = all.find(d => d.dept_id === id);
    if (dept)
      return dept;
    else
      return all.map(d => this._getDeptFromAllById(id, d.children)).find(x => x !== null);
  }

  /**
   *
   *
   * @param {string} deptID
   * @returns
   * @memberof DepartmentService
   */
  updateDepartment(deptID: string, deptName: string, parentID?: string) {
    if (!deptID) {
      throw new ParamsError('deptID', 'updateDepartment', 'string', deptID);
    }
    if (!deptName) {
      throw new ParamsError('deptName', 'updateDepartment', 'string', deptName);
    }

    const params: { [k: string]: any } = {
      deptID,
      dept_name: deptName
    };
    if (parentID) {
      params.parent_id = parentID;
    }

    return of(undefined);
    return this.restAPIService.dispatchRestApi('PutDepartmentByDeptID', params);
  }
}
