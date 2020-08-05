import { Component, OnInit, Input } from '@angular/core';
import { CustomModalActionButton, CustomModalBase } from '../../../ui';
import { SitemapService, GroupService, GroupSitemapInfo } from '../../../../global/api/service';
import { SiteMapGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapGetResponse';
import { SiteInfo } from '../../../../global/api/neuxAPI/bean/SiteInfo';

@Component({
  selector: 'cms-admin-group-sitemap-setting-modal',
  templateUrl: './admin-group-sitemap-setting-modal.component.html',
  styleUrls: ['./admin-group-sitemap-setting-modal.component.css']
})
export class AdminGroupSitemapSettingModalComponent extends CustomModalBase implements OnInit {
  title = '設定前台節點';
  actions: CustomModalActionButton[];

  @Input() groupID: string;

  groupSitemapInfo: GroupSitemapInfo[] = [];

  siteID = 'none';
  sites: SiteInfo[] = [];
  sitemaps: SiteMapGetResponse[];

  constructor(
    private sitemapService: SitemapService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    this.sitemapService.getSiteList().subscribe(sites => this.sites = sites);
    this.groupService.getGroupSiteMapList(this.groupID).subscribe(groupSitemapInfo => this.groupSitemapInfo = groupSitemapInfo);
  }

  onSelectionChange(ev) {
    if (this.siteID === 'none') {
      this.sitemaps = null;
      return;
    }
    this.sitemapService.getCMSSiteMap(this.siteID).subscribe(sitemaps => this.sitemaps = sitemaps);
  }

  confirm() {

  }

}
