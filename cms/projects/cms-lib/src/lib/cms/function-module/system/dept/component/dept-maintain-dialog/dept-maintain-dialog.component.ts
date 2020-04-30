import { Component, OnInit } from '@angular/core';
import { CustomDialogBase } from 'projects/cms-lib/src/lib/ui/dialog/custom-dialog-base';

@Component({
  selector: 'cms-dept-maintain-dialog',
  templateUrl: './dept-maintain-dialog.component.html',
  styleUrls: ['./dept-maintain-dialog.component.css']
})
export class DeptMaintainDialogComponent extends CustomDialogBase implements OnInit {

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
