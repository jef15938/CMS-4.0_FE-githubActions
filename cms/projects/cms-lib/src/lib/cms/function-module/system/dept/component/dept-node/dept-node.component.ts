import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DepartmentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/DepartmentInfo';
import { CmsTreeNodeRenderer, CmsTreeNode } from 'projects/cms-lib/src/lib/ui/tree/tree.interface';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  onActionClicked(action: ActionType) {
    this.node.tree.triggerCustomEvent(new DeptNodeCustomEvent(action, this.node.data));
  }

}
