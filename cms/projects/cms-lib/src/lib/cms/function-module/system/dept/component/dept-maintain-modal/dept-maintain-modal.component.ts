import { Component, OnInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../../../../ui/modal/custom-modal-base';
import { DepartmentService } from './../../../../../../service/department.service';
import { DepartmentInfo } from './../../../../../../neuxAPI/bean/DepartmentInfo';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'cms-dept-maintain-modal',
  templateUrl: './dept-maintain-modal.component.html',
  styleUrls: ['./dept-maintain-modal.component.scss']
})
export class DeptMaintainModalComponent extends CustomModalBase implements OnInit {

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}部門`;
  actions: CustomModalActionButton[] = [];

  action: 'Create' | 'Update' = 'Create';

  deptId: string;
  parentId: string;

  dept: DepartmentInfo;

  constructor(
    private departmentService: DepartmentService
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
        : this.departmentService.getDepartmentByID(this.deptId)
    ).pipe(
      tap(dept => this.dept = dept)
    );
  }

  private save() {
    return (
      this.action === 'Create'
        ? this.departmentService.createDepartment(this.dept.dept_id, this.dept.dept_name, this.parentId)
        : this.departmentService.updateDepartment(this.dept.dept_id, this.dept.dept_name, this.parentId)
    );
  }

  confirm() {
    this.save().subscribe(_ => {
      this.close('Confirm');
    });
  }

  getErrorMessage(model: NgModel) {
    if (model.hasError('required')) return 'Required';
  }

}
