import { Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsTreeNodeRenderer, CmsTreeNode } from '@cms-lib/ui/tree';
import { SiteMapInfo } from '@cms-lib/neuxAPI/bean/SiteMapInfo';

enum ActionType {
  Create, Delete
}

export class MultiSiteNodeCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: SiteMapInfo,
  ) { }
}

@Component({
  selector: 'cms-multi-site-node',
  templateUrl: './multi-site-node.component.html',
  styleUrls: ['./multi-site-node.component.scss']
})
export class MultiSiteNodeComponent implements CmsTreeNodeRenderer<SiteMapInfo>, OnInit, OnDestroy {

  ActionType = ActionType;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  node: CmsTreeNode<SiteMapInfo>;

  private destroy$ = new Subject();

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<SiteMapInfo>) {
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

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    this.trigger.openMenu();
  }

  onMenuClicked(action: ActionType) {
    this.node.tree.triggerCustomEvent(new MultiSiteNodeCustomEvent(action, this.node.data));
  }

}
