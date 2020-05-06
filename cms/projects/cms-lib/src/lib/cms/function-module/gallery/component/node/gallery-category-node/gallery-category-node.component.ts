import { Component, OnInit, HostListener, ViewChild, OnDestroy, Type } from '@angular/core';
import { CmsTreeNodeRenderer, CmsTreeNode } from 'projects/cms-lib/src/lib/ui/tree/tree.interface';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GalleryCategoryInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/GalleryCategoryInfo';

enum ActionType {
  Create, Edit, Delete
}

export class GalleryCategoryNodeCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: GalleryCategoryInfo
  ) { }
}

@Component({
  selector: 'cms-gallery-category-node',
  templateUrl: './gallery-category-node.component.html',
  styleUrls: ['./gallery-category-node.component.scss']
})
export class GalleryCategoryNodeComponent implements CmsTreeNodeRenderer<GalleryCategoryInfo>, OnInit, OnDestroy {

  ActionType = ActionType;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  node: CmsTreeNode<GalleryCategoryInfo>;

  private _destroy$ = new Subject();

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<GalleryCategoryInfo>) {
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

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    this.trigger.openMenu();
  }

  onMenuClicked(action: ActionType) {
    this.node.tree.triggerCustomEvent(new GalleryCategoryNodeCustomEvent(action, this.node.data));
  }

}
