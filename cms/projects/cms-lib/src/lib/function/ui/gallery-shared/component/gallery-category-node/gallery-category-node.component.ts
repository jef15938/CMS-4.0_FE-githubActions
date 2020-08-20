import { Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CmsTreeNodeRenderer, CmsTreeNode } from '../../../../ui/tree';
import { GalleryCategoryInfoModel } from '../../../../../global/api/data-model/models/gallery-category-info.model';

enum ActionType {
  CREATE, EDIT, DELETE, UPLOAD
}

export class GalleryCategoryNodeCustomEvent {
  ActionType = ActionType;
  constructor(
    public action: ActionType,
    public data: GalleryCategoryInfoModel
  ) { }
}

@Component({
  selector: 'cms-gallery-category-node',
  templateUrl: './gallery-category-node.component.html',
  styleUrls: ['./gallery-category-node.component.scss']
})
export class GalleryCategoryNodeComponent implements CmsTreeNodeRenderer<GalleryCategoryInfoModel>, OnInit, OnDestroy {

  ActionType = ActionType;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  mode: 'page' | 'modal' = 'page';
  node: CmsTreeNode<GalleryCategoryInfoModel>;

  private destroy$ = new Subject();

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<GalleryCategoryInfoModel>) {
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
    this.node.tree.triggerCustomEvent(new GalleryCategoryNodeCustomEvent(action, this.node.data));
  }

}
