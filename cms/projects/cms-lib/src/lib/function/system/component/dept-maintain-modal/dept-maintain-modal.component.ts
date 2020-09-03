import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DepartmentService } from '../../../../global/api/service';
import { CustomModalBase, CustomModalActionButton } from '../../../ui/modal';
import { DepartmentDetailInfoModel } from '../../../../global/api/data-model/models/department-detail-info.model';
import { CmsErrorHandler } from '../../../../global/error-handling';

@Component({
  selector: 'cms-dept-maintain-modal',
  templateUrl: './dept-maintain-modal.component.html',
  styleUrls: ['./dept-maintain-modal.component.scss']
})
export class DeptMaintainModalComponent extends CustomModalBase implements OnInit {

  title: string | (() => string) = '';
  actions: CustomModalActionButton[] = [];

  action: 'Create' | 'Update' = 'Create';

  deptId: string;
  parentId: string;

  dept: DepartmentDetailInfoModel;

  constructor(
    private departmentService: DepartmentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.title = `${this.action === 'Create' ? '新增' : '修改'}部門`;
    this.getDept().subscribe();
  }

  getDept() {
    return (
      this.action === 'Create'
        ? of(new DepartmentDetailInfoModel())
        : this.departmentService.getDepartmentByID(this.deptId)
    ).pipe(
      CmsErrorHandler.rxHandleError('取得部門資料錯誤'),
      tap(dept => this.dept = dept)
    );
  }

  private save() {
    const action = this.action === 'Create' ? '新增' : '更新';
    return (
      this.action === 'Create'
        ? this.departmentService.createDepartment(this.dept.deptId, this.dept.deptName, this.parentId)
        : this.departmentService.updateDepartment(this.dept.deptId, this.dept.deptName, this.parentId)
    ).pipe(CmsErrorHandler.rxHandleError(`${action}新增部門錯誤`));
  }

  confirm() {
    this.save().subscribe(_ => {
      this.close('Confirm');
    });
  }

}
