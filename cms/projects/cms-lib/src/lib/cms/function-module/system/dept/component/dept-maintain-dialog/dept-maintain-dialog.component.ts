import { Component, OnInit } from '@angular/core';
import { CustomDialogBase, CustomDialogActionButton } from 'projects/cms-lib/src/lib/ui/dialog/custom-dialog-base';

@Component({
  selector: 'cms-dept-maintain-dialog',
  templateUrl: './dept-maintain-dialog.component.html',
  styleUrls: ['./dept-maintain-dialog.component.css']
})
export class DeptMaintainDialogComponent extends CustomDialogBase implements OnInit {

  title: string | (() => string) = () => `${this.action === 'Create' ? '新增' : '修改'}部門`;
  actions: CustomDialogActionButton[] = [
    {
      text: '取消',
      onClick: () => this.close(),
    },
    {
      text: '儲存',
      onClick: () => this.confirm(),
    }
  ];

  action: 'Create' | 'Update' = 'Create';

  deptId: string;
  deptName: string;
  parentId: string;
  parentName: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  confirm() {
    this.close('Confirm');
  }

}
