import { Injectable } from '@angular/core';
import { RestApiService } from 'src/neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';

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
    return this.restAPIService.dispatchRestApi('DeleteDepartmentByDeptID', { deptID });
  }

  /**
   *
   *
   * @returns
   * @memberof DepartmentService
   */
  getAllDepartment() {
    return this.restAPIService.dispatchRestApi('GetDepartment', {});
  }

  updateDepartment(deptID: string) {
    if (!deptID) {
      throw new ParamsError('deptID', 'createDepartment', 'string', deptID);
    }
    return this.restAPIService.dispatchRestApi('PutDepartmentByDeptID', { deptID });
  }
}
