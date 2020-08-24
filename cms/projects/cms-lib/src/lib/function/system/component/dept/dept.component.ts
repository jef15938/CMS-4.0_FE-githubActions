import { Component, OnInit } from '@angular/core';
import { Observable, concat, of } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';
import { DepartmentService } from '../../../../global/api/service';
import { CmsTree } from '../../../ui/tree';
import { ModalService } from '../../../ui/modal';
import { DeptNodeComponent, DeptNodeCustomEvent } from '../dept-node/dept-node.component';
import { DeptMaintainModalComponent } from '../dept-maintain-modal/dept-maintain-modal.component';
import { DepartmentInfoModel } from '../../../../global/api/data-model/models/department-info.model';

@Component({
  selector: 'cms-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  customNodeRenderer = DeptNodeComponent;

  depts: DepartmentInfoModel[] = [];

  constructor(
    private departmentService: DepartmentService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.initPage().subscribe();
  }

  private initPage(): Observable<any> {
    return concat(
      this.getDepts(),
    );
  }

  private getDepts() {
    return this.departmentService.getAllDepartment().pipe(
      tap(depts => this.depts = depts),
    );
  }

  afterTreeRender(ev: { tree: CmsTree<DepartmentInfoModel>, firstTime: boolean }) {
    const defaultSelect = this.depts ? this.depts[0] : undefined;
    ev.tree.selectNode(defaultSelect);
  }

  onCustomEvent(event: DeptNodeCustomEvent) {
    if (event instanceof DeptNodeCustomEvent) {
      let actionOb: Observable<any> = of(undefined);
      switch (event.action) {
        case event.ActionType.CREATE:
          actionOb = this.openDeptMaintainModal('Create', event.data);
          break;
        case event.ActionType.EDIT:
          actionOb = this.openDeptMaintainModal('Update', event.data);
          break;
        case event.ActionType.DELETE:
          actionOb = this.deleteDepartment(event.data);
          break;
      }

      actionOb.subscribe(res => {
        if (res) {
          this.initPage().subscribe();
        }
      });
    }
  }

  deleteDepartment(dept: DepartmentInfoModel) {
    return of(undefined).pipe(
      this.modalService.confirmDelete,
      concatMap(confirm => confirm ? this.departmentService.deleteDepartment(dept.deptId) : of(undefined))
    );
  }

  openDeptMaintainModal(action: 'Create' | 'Update', selectedDept: DepartmentInfoModel) {
    const parent = this.findParentDept(selectedDept);
    return this.modalService.openComponent({
      component: DeptMaintainModalComponent,
      componentInitData: {
        action,
        deptId: action === 'Create' ? '' : selectedDept.deptId,
        parentId: action === 'Create' ? selectedDept.deptId : parent ? parent.deptId : '',
      }
    });
  }

  findParentDept(child: DepartmentInfoModel, sources: DepartmentInfoModel[] = this.depts || []): DepartmentInfoModel {
    if (!sources.length) { return null; }
    for (let i = 0, l = sources.length; i < l; ++i) {
      const parent = sources[i];
      const children = parent.children || [];
      if (children.indexOf(child) > -1) {
        return parent;
      }
    }
    return this.findParentDept(child, sources.reduce((previous, current) => previous.concat((current.children || [])), []));
  }

}
