import { Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { CmsTreeNodeRenderer, CmsTreeNode } from 'projects/cms-lib/src/lib/ui/tree/tree.interface';
import { MatMenuTrigger } from '@angular/material/menu';
import { SiteMapInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/SiteMapInfo';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class MultiSiteNodeCustomEvent {
  action: 'Create' | 'Delete';
  sitemap: SiteMapInfo;

  constructor(action: 'Create' | 'Delete', sitemap: SiteMapInfo) {
    this.action = action;
    this.sitemap = sitemap;
  }
}

@Component({
  selector: 'cms-multi-site-node',
  templateUrl: './multi-site-node.component.html',
  styleUrls: ['./multi-site-node.component.scss']
})
export class MultiSiteNodeComponent implements CmsTreeNodeRenderer<SiteMapInfo>, OnInit, OnDestroy {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  node: CmsTreeNode<SiteMapInfo>;

  private _destroy$ = new Subject();

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<SiteMapInfo>) {
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

  onMenuClicked(action: 'Create' | 'Delete') {
    this.node.tree.triggerCustomEvent(new MultiSiteNodeCustomEvent(action, this.node.data));
  }

}
