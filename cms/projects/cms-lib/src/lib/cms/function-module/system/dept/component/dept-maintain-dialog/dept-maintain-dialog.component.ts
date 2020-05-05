import { Component, OnInit } from '@angular/core';
import { CustomDialogBase, CustomDialogActionButton } from 'projects/cms-lib/src/lib/ui/dialog/custom-dialog-base';
import { DepartmentService } from 'projects/cms-lib/src/lib/service/department.service';
import { DepartmentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/DepartmentInfo';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'cms-dept-maintain-dialog',
  templateUrl: './dept-maintain-dialog.component.html',
  styleUrls: ['./dept-maintain-dialog.component.css']
})
export class DeptMaintainDialogComponent extends CustomDialogBase implements OnInit {

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}部門`;
  actions: CustomDialogActionButton[] = [];

  action: 'Create' | 'Update' = 'Create';

  deptId: string;
  parentId: string;

  dept: DepartmentInfo;

  constructor(
    private _departmentService: DepartmentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDept().subscribe();
  }

  getDept() {
    return (
      this.action === 'Create'
        ? of(new DepartmentInfo())
        : this._departmentService.getDepartmentByID(this.deptId)
    ).pipe(
      tap(dept => this.dept = dept)
    );
  }

  private _save() {
    return (
      this.action === 'Create'
        ? this._departmentService.createDepartment(this.dept.dept_id, this.dept.dept_name, this.parentId)
        : this._departmentService.updateDepartment(this.dept.dept_id, this.dept.dept_name, this.parentId)
    );
  }

  confirm() {
    this._save().subscribe(_ => {
      this.close('Confirm');
    });
  }

  getErrorMessage(model: NgModel) {
    if (model.hasError('required')) return 'Required';
  }

}
