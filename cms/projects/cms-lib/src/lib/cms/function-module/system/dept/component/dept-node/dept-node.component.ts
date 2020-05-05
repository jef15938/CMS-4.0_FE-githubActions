import { Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { DepartmentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/DepartmentInfo';
import { CmsTreeNodeRenderer, CmsTreeNode } from 'projects/cms-lib/src/lib/ui/tree/tree.interface';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class DeptNodeComponent implements CmsTreeNodeRenderer<DepartmentInfo>, OnInit, OnDestroy {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  node: CmsTreeNode<DepartmentInfo>;

  private _destroy$ = new Subject();

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<DepartmentInfo>) {
    this.node = node;
  }

  ngOnInit(): void {
    this.node.tree.rightClickedNode
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        if (data === this.node.data) {
          this.trigger.openMenu();
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  onCreateBtnClicked() {
    this.node.tree.triggerCustomEvent(new DeptNodeCustomEvent('Create', this.node.data));
  }

  onUpdateBtnClicked() {
    this.node.tree.triggerCustomEvent(new DeptNodeCustomEvent('Update', this.node.data));
  }

}
