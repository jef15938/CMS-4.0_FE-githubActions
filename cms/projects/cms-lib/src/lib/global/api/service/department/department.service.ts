import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { DepartmentGetResponse } from '../../neuxAPI/bean/DepartmentGetResponse';
import { ModelMapper } from '../../data-model/model-mapper';
import { DepartmentGetResponseModel } from '../../data-model/models/department-get-response.model';
import { DepartmentInfoModel } from '../../data-model/models/department-info.model';
import { DepartmentDetailInfo } from '../../neuxAPI/bean/DepartmentDetailInfo';
import { DepartmentDetailInfoModel } from '../../data-model/models/department-detail-info.model';
import { DepartmentMaintainRequest } from '../../neuxAPI/bean/DepartmentMaintainRequest';

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

    const requestBody: Partial<DepartmentMaintainRequest> = {
      dept_name: deptName,
    };

    if (parentID) {
      requestBody.parent_id = parentID;
    }

    const params: { [k: string]: any } = {
      deptID,
      requestBody,
    };

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
      throw new ParamsError('deptID', 'deleteDepartment', 'string', deptID);
    }

    return this.restAPIService.dispatchRestApi('DeleteDepartmentByDeptID', { deptID });
  }

  /**
   *
   *
   * @returns
   * @memberof DepartmentService
   */
  getAllDepartment(): Observable<DepartmentInfoModel[]> {
    return this.restAPIService.dispatchRestApi<DepartmentGetResponse>('GetDepartment', {}).pipe(
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

    return this.restAPIService.dispatchRestApi<DepartmentDetailInfo>('GetDepartmentByDeptID', { deptID }).pipe(
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

    const requestBody: Partial<DepartmentMaintainRequest> = {
      dept_name: deptName,
    };

    if (parentID) {
      requestBody.parent_id = parentID;
    }

    const params: { [k: string]: any } = {
      deptID,
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PutDepartmentByDeptID', params);
  }
}
