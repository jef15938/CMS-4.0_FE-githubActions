import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DepartmentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/DepartmentInfo';
import { CmsTreeNodeRenderer, CmsTreeNode } from 'projects/cms-lib/src/lib/ui/tree/tree.interface';
import { MatMenuTrigger } from '@angular/material/menu';

export class DeptNodeCustomEvent {
  action: 'Create' | 'Update';
  dept: DepartmentInfo;

  constructor(action: 'Create' | 'Update', dept: DepartmentInfo) {
    this.action = action;
    this.dept = dept;
  }
}

@Component({
  selector: 'cms-dept-node',
  templateUrl: './dept-node.component.html',
  styleUrls: ['./dept-node.component.scss']
})
export class DeptNodeComponent implements CmsTreeNodeRenderer<DepartmentInfo>, OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  node: CmsTreeNode<DepartmentInfo>;

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<DepartmentInfo>) {
    this.node = node;
  }

  ngOnInit(): void {
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    this.trigger.openMenu();
    event.preventDefault();
  }

  onCreateBtnClicked() {
    this.node.tree.triggerCustomEvent(new DeptNodeCustomEvent('Create', this.node.data));
  }

  onUpdateBtnClicked() {
    this.node.tree.triggerCustomEvent(new DeptNodeCustomEvent('Update', this.node.data));
  }

}
