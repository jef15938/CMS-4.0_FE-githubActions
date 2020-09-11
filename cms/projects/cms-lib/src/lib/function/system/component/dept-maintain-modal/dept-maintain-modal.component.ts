import { Component, OnInit, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
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

  @Input() action: 'Create' | 'Update' = 'Create';
  @Input() deptId: string;
  @Input() parentId: string;

  dept$: Observable<DepartmentDetailInfoModel>;

  constructor(
    private departmentService: DepartmentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.title = `${this.action === 'Create' ? '新增' : '修改'}部門`;
    this.dept$ = (
      this.action === 'Create'
        ? of(new DepartmentDetailInfoModel())
        : this.departmentService.getDepartmentByID(this.deptId)
    ).pipe(
      CmsErrorHandler.rxHandleError(),
    );
  }

  private save(dept: DepartmentDetailInfoModel) {
    const action = this.action === 'Create' ? '新增' : '更新';
    return (
      this.action === 'Create'
        ? this.departmentService.createDepartment(dept.deptId, dept.deptName, this.parentId)
        : this.departmentService.updateDepartment(dept.deptId, dept.deptName, this.parentId)
    ).pipe(CmsErrorHandler.rxHandleError());
  }

  confirm(dept: DepartmentDetailInfoModel) {
    this.save(dept).subscribe(_ => {
      this.close('Confirm');
    });
  }

}
