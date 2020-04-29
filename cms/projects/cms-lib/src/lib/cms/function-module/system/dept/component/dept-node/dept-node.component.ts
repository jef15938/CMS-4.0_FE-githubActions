import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DepartmentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/DepartmentInfo';
import { CmsTreeNodeRenderer, CmsTreeNode } from 'projects/cms-lib/src/lib/ui/tree/tree.interface';
import { MatMenuTrigger } from '@angular/material/menu';

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

  onAddBtnClicked() {
    alert('Add');
    this.node.tree.triggerCustomEvent('Add');
  }

  onEditBtnClicked() {
    alert('Edit');
    this.node.tree.triggerCustomEvent('Edit');
  }

}
