import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeptNodeComponent, DeptNodeCustomEvent } from './component/dept-node/dept-node.component';
import { DepartmentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/DepartmentInfo';
import { DeptMaintainDialogComponent } from './component/dept-maintain-dialog/dept-maintain-dialog.component';
import { DialogService } from 'projects/cms-lib/src/lib/ui/dialog/dialog.service';

@Component({
  selector: 'cms-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  customNodeRenderer = DeptNodeComponent;

  depts: DepartmentInfo[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.depts = this._route.snapshot.data['depts'];
  }

  onCustomEvent(event: DeptNodeCustomEvent) {
    if (event instanceof DeptNodeCustomEvent) {
      switch (event.action) {
        case 'Create':
          console.warn('DeptComponent onCustomEvent() Create', event);
          this.openDialog('Create', event.dept).subscribe(res => {
            console.warn('Dialog Close res = ', res);
          });
          break;
        case 'Update':
          console.warn('DeptComponent onCustomEvent() Update', event);
          this.openDialog('Update', event.dept).subscribe(res => {
            console.warn('Dialog Close res = ', res);
          });
          break;
      }
    }
  }

  openDialog(action: 'Create' | 'Update', selectedDept: DepartmentInfo) {
    const parent = this.findParentDept(selectedDept);
    return this._dialogService.openComponent({
      component: DeptMaintainDialogComponent,
      componentInitData: {
        action,
        deptId: action === 'Create' ? '' : selectedDept.dept_id,
        deptName: action === 'Create' ? '' : selectedDept.dept_name,
        parentId: action === 'Create' ? selectedDept.dept_id : parent ? parent.dept_id : '',
        parentName: action === 'Create' ? selectedDept.dept_name : parent ? parent.dept_name : '',
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
