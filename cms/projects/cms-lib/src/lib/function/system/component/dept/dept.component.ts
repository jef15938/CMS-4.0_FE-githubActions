import { Component, OnInit } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import { DepartmentService } from '../../../../global/api/service';
import { CmsTree } from '../../../ui/tree';
import { ModalService } from '../../../ui/modal';
import { DeptNodeComponent, DeptNodeCustomEvent } from '../dept-node/dept-node.component';
import { DeptMaintainModalComponent } from '../dept-maintain-modal/dept-maintain-modal.component';
import { DepartmentInfoModel } from '../../../../global/api/data-model/models/department-info.model';
import { CmsErrorHandler } from '../../../../global/error-handling';

@Component({
  selector: 'cms-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  customNodeRenderer = DeptNodeComponent;

  refresh$ = new BehaviorSubject(undefined);
  depts$: Observable<DepartmentInfoModel[]>;

  constructor(
    private departmentService: DepartmentService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.depts$ = this.refresh$.pipe(
      switchMap(_ => this.departmentService.getAllDepartment().pipe(
        CmsErrorHandler.rxHandleError('取得部門清單錯誤'),
      ))
    );
    this.refresh$.next(undefined);
  }

  afterTreeRender(ev: { tree: CmsTree<DepartmentInfoModel>, firstTime: boolean }, depts: DepartmentInfoModel[]) {
    const defaultSelect = depts ? depts[0] : undefined;
    ev.tree.selectNode(defaultSelect);
  }

  onCustomEvent(event: DeptNodeCustomEvent, depts: DepartmentInfoModel[]) {
    if (event instanceof DeptNodeCustomEvent) {
      let actionOb: Observable<any> = of(undefined);
      switch (event.action) {
        case event.ActionType.CREATE:
          actionOb = this.openDeptMaintainModal('Create', event.data, depts);
          break;
        case event.ActionType.EDIT:
          actionOb = this.openDeptMaintainModal('Update', event.data, depts);
          break;
        case event.ActionType.DELETE:
          actionOb = this.deleteDepartment(event.data);
          break;
      }

      actionOb.subscribe(res => {
        if (res) {
          this.refresh$.next(undefined);
        }
      });
    }
  }

  deleteDepartment(dept: DepartmentInfoModel) {
    return of(undefined).pipe(
      this.modalService.confirmDelete,
      concatMap(confirm => confirm
        ? this.departmentService.deleteDepartment(dept.deptId).pipe(CmsErrorHandler.rxHandleError('刪除部門錯誤'))
        : of(undefined)
      )
    );
  }

  openDeptMaintainModal(action: 'Create' | 'Update', selectedDept: DepartmentInfoModel, depts: DepartmentInfoModel[]) {
    const parent = this.findParentDept(selectedDept, depts);
    return this.modalService.openComponent({
      component: DeptMaintainModalComponent,
      componentInitData: {
        action,
        deptId: action === 'Create' ? '' : selectedDept.deptId,
        parentId: action === 'Create' ? selectedDept.deptId : parent ? parent.deptId : '',
      }
    });
  }

  findParentDept(child: DepartmentInfoModel, sources: DepartmentInfoModel[]): DepartmentInfoModel {
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
