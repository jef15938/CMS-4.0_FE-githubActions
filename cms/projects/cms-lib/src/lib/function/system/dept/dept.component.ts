import { Component, OnInit } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DepartmentInfo } from '../../../global/api/neuxAPI/bean/DepartmentInfo';
import { DepartmentService } from '../../../global/api/service';
import { CmsTree } from './../../ui/tree';
import { ModalService } from './../../ui/modal';
import { DeptNodeComponent, DeptNodeCustomEvent } from './component/dept-node/dept-node.component';
import { DeptMaintainModalComponent } from './component/dept-maintain-modal/dept-maintain-modal.component';

@Component({
  selector: 'cms-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  customNodeRenderer = DeptNodeComponent;

  depts: DepartmentInfo[] = [];

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
      this.openModal(action, event.data).subscribe(res => {
        if (res) {
          this.initPage().subscribe();
        }
      });
    }
  }

  openModal(action: 'Create' | 'Update', selectedDept: DepartmentInfo) {
    const parent = this.findParentDept(selectedDept);
    return this.modalService.openComponent({
      component: DeptMaintainModalComponent,
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
