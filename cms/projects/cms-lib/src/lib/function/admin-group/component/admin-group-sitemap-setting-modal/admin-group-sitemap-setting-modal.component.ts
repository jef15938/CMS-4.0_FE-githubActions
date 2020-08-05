import { Component, OnInit, Input } from '@angular/core';
import { CustomModalActionButton, CustomModalBase } from '../../../ui';
import { SitemapService } from '../../../../global/api/service';
import { SiteMapGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapGetResponse';

@Component({
  selector: 'cms-admin-group-sitemap-setting-modal',
  templateUrl: './admin-group-sitemap-setting-modal.component.html',
  styleUrls: ['./admin-group-sitemap-setting-modal.component.css']
})
export class AdminGroupSitemapSettingModalComponent extends CustomModalBase implements OnInit {
  title: '';
  actions: CustomModalActionButton[];

  @Input() siteID: string;

  sitemaps: SiteMapGetResponse[];

  constructor(
    private sitemapService: SitemapService
  ) { super(); }

  ngOnInit(): void {
    this.sitemapService.getCMSSiteMap(this.siteID).subscribe(sitemaps => this.sitemaps = sitemaps);
  }

}
