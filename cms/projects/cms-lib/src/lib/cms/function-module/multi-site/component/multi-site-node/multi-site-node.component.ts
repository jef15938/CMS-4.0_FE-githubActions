import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CmsTreeNodeRenderer, CmsTreeNode } from 'projects/cms-lib/src/lib/ui/tree/tree.interface';
import { MatMenuTrigger } from '@angular/material/menu';
import { SiteMapInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/SiteMapInfo';

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
export class MultiSiteNodeComponent implements CmsTreeNodeRenderer<SiteMapInfo>, OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  node: CmsTreeNode<SiteMapInfo>;

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<SiteMapInfo>) {
    this.node = node;
  }

  ngOnInit(): void {
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    this.trigger.openMenu();
    event.preventDefault();
  }

  onMenuClicked(action: 'Create' | 'Delete') {
    this.node.tree.triggerCustomEvent(new MultiSiteNodeCustomEvent(action, this.node.data));
  }

}
