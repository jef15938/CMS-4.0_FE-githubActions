import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../ui/modal';
import { SitemapService } from '../../../../global/api/service';
import { SiteMapNodeInfo } from '../../../../global/api/neuxAPI/bean/SiteMapNodeInfo';

@Component({
  selector: 'cms-auditing-sitemap-modal',
  templateUrl: './auditing-sitemap-modal.component.html',
  styleUrls: ['./auditing-sitemap-modal.component.scss']
})
export class AuditingSitemapModalComponent extends CustomModalBase implements OnInit {
  title = '節點送審';
  actions: CustomModalActionButton[];

  @Input() siteId: string;
  @Input() sitemapNode: SiteMapNodeInfo;

  startTime = '2020-07-09 00:00';
  endTime = '9999-12-31 00:00';
  memo: string;

  constructor(
    private siteMapService: SitemapService,
  ) { super(); }

  ngOnInit(): void {
  }

  confirm() {
    this.siteMapService.auditingSitemap(
      this.sitemapNode.layout_id,
      this.startTime,
      this.endTime,
      this.memo,
      this.siteId,
      this.sitemapNode.node_id
    ).subscribe(_ => {
      this.close('Created');
    });
  }

}
