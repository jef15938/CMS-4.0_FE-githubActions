import { Component, OnInit } from '@angular/core';
import { DeptNodeComponent, DeptNodeCustomEvent } from './component/dept-node/dept-node.component';
import { DepartmentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/DepartmentInfo';
import { DeptMaintainDialogComponent } from './component/dept-maintain-dialog/dept-maintain-dialog.component';
import { DialogService } from 'projects/cms-lib/src/lib/ui/dialog/dialog.service';
import { Observable, concat } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DepartmentService } from 'projects/cms-lib/src/lib/service/department.service';
import { CmsTree } from 'projects/cms-lib/src/lib/ui/tree/tree.interface';

@Component({
  selector: 'cms-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  customNodeRenderer = DeptNodeComponent;

  depts: DepartmentInfo[] = [];

  constructor(
    private _departmentService: DepartmentService,
    private _dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this._initPage().subscribe();
  }

  private _initPage(): Observable<any> {
    return concat(
      this._getDepts(),
    )
  }

  private _getDepts() {
    return this._departmentService.getAllDepartment().pipe(
      tap(depts => this.depts = depts),
    )
  }

  afterTreeRender(tree: CmsTree<DepartmentInfo>) {
    const defaultSelect = this.depts ? this.depts[0] : undefined;
    tree.selectNode(defaultSelect);
  }

  onCustomEvent(event: DeptNodeCustomEvent) {
    if (event instanceof DeptNodeCustomEvent) {
      let action: 'Create' | 'Update';
      switch (event.action) {
        case event.ActionType.Create:
          action = 'Create';
          break;
        case event.ActionType.Edit:
          action = 'Update';
          break;
      }
      this.openDialog(action, event.data).subscribe(res => {
        if (res) {
          this._initPage().subscribe();
        }
      });
    }
  }

  openDialog(action: 'Create' | 'Update', selectedDept: DepartmentInfo) {
    const parent = this.findParentDept(selectedDept);
    return this._dialogService.openComponent({
      component: DeptMaintainDialogComponent,
      componentInitData: {
        action,
        deptId: action === 'Create' ? '' : selectedDept.dept_id,
        parentId: action === 'Create' ? selectedDept.dept_id : parent ? parent.dept_id : '',
      }
    });
  }

  findParentDept(child: DepartmentInfo, sources: DepartmentInfo[] = this.depts || []): DepartmentInfo {
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
