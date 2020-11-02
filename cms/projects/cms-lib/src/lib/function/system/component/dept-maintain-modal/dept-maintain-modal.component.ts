import { Component, OnInit, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DepartmentService } from '../../../../global/api/service';
import { CustomModalBase } from '../../../ui/modal';
import { DepartmentDetailInfoModel } from '../../../../global/api/data-model/models/department-detail-info.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { CmsLoadingToggle } from '../../../../global/service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cms-dept-maintain-modal',
  templateUrl: './dept-maintain-modal.component.html',
  styleUrls: ['./dept-maintain-modal.component.scss']
})
export class DeptMaintainModalComponent extends CustomModalBase<DeptMaintainModalComponent, 'Success'> implements OnInit {

  title: string | (() => string) = '';

  @Input() action: 'Create' | 'Update' = 'Create';
  @Input() deptId: string;
  @Input() parentId: string;

  dept$: Observable<DepartmentDetailInfoModel>;

  constructor(
    private departmentService: DepartmentService,
    private cmsLoadingToggle: CmsLoadingToggle,
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
    this.cmsLoadingToggle.open();
    return (
      this.action === 'Create'
        ? this.departmentService.createDepartment(dept.deptId, dept.deptName, this.parentId)
        : this.departmentService.updateDepartment(dept.deptId, dept.deptName, this.parentId)
    ).pipe(
      tap(_ => this.cmsLoadingToggle.close()),
      CmsErrorHandler.rxHandleError((error, showMessage) => {
        this.cmsLoadingToggle.close();
        showMessage();
      })
    );
  }

  confirm(dept: DepartmentDetailInfoModel) {
    this.save(dept).subscribe(_ => {
      this.close('Success');
    });
  }

}
