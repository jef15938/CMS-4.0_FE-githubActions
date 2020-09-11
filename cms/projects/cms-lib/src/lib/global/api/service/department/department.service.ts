import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError, ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { DepartmentGetResponseModel } from '../../data-model/models/department-get-response.model';
import { DepartmentInfoModel } from '../../data-model/models/department-info.model';
import { DepartmentDetailInfoModel } from '../../data-model/models/department-detail-info.model';
import { DepartmentMaintainRequest } from '../../neuxAPI/bean/DepartmentMaintainRequest';
import { DepartmentServiceError, CmsErrorHandler } from '../../../error-handling';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  error = new DepartmentServiceError();

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

    const requestBody: DepartmentMaintainRequest = {
      dept_name: deptName,
      parent_id: parentID || '',
    };

    const params = {
      deptID,
      requestBody,
    };

    return this.restAPIService.CreateDepartment(params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('createDepartment')),
    );
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
      throw new ParamsError('deptID', 'deleteDepartment', 'string', deptID);
    }

    return this.restAPIService.DeleteDepartment({ deptID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('deleteDepartment')),
    );
  }

  /**
   *
   *
   * @returns
   * @memberof DepartmentService
   */
  getAllDepartment(): Observable<DepartmentInfoModel[]> {
    return this.restAPIService.GetDepartment({}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getAllDepartment')),
      ModelMapper.rxMapModelTo(DepartmentGetResponseModel),
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
  getDepartmentByID(deptID: string): Observable<DepartmentDetailInfoModel> {
    if (!deptID) {
      throw new ParamsError('deptID', 'getDepartmentByID', 'string', deptID);
    }

    return this.restAPIService.GetDepartmentInfo({ deptID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getDepartmentByID')),
      ModelMapper.rxMapModelTo(DepartmentDetailInfoModel)
    );
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

    const requestBody: DepartmentMaintainRequest = {
      dept_name: deptName,
      parent_id: parentID || '',
    };

    const params = {
      deptID,
      requestBody,
    };

    return this.restAPIService.UpdateDepartment(params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('updateDepartment')),
    );
  }
}
