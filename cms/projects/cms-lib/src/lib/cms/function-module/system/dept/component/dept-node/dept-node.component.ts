import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DepartmentInfo } from '@cms-lib/neuxAPI/bean/DepartmentInfo';
import { CmsTreeNodeRenderer, CmsTreeNode } from '@cms-lib/ui/tree';

enum ActionType {
  Create, Edit
}

export class DeptNodeCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: DepartmentInfo
  ) { }
}

@Component({
  selector: 'cms-dept-node',
  templateUrl: './dept-node.component.html',
  styleUrls: ['./dept-node.component.scss']
})
export class DeptNodeComponent implements CmsTreeNodeRenderer<DepartmentInfo>, OnInit, OnDestroy {
  ActionType = ActionType;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  node: CmsTreeNode<DepartmentInfo>;

  private destroy$ = new Subject();

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<DepartmentInfo>) {
    this.node = node;
  }

  ngOnInit(): void {
    this.node.tree.rightClickedNode
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data === this.node.data) {
          this.trigger.openMenu();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  onActionClicked(action: ActionType) {
    this.node.tree.triggerCustomEvent(new DeptNodeCustomEvent(action, this.node.data));
  }

}
