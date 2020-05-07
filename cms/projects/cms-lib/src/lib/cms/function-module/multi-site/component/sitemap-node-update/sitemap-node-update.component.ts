import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { SiteMapInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/SiteMapInfo';
import { UserSiteMapPutRequest } from 'projects/cms-lib/src/lib/neuxAPI/bean/UserSiteMapPutRequest';
import { UserSiteMapPostRequest } from 'projects/cms-lib/src/lib/neuxAPI/bean/UserSiteMapPostRequest';
import { NgForm } from '@angular/forms';

enum NodeType {
  None = '',
  Url = 'URL',
  Content = 'CONTENT'
}

enum UrlType {
  Inside = 'INSIDE',
  Outside = 'OUTSIDE',
}

enum UrlBlankType {
  Yes = 'Y',
  No = 'N',
}

class SiteMapUpdateModel extends UserSiteMapPutRequest {
  constructor(siteMapInfo: SiteMapInfo, parent_id: string) {
    super();
    this.node_name = siteMapInfo.node_name;
    this.node_orders = "";
    this.parent_id = parent_id;
    // URL
    this.url = siteMapInfo.url;
    this.url_blank = siteMapInfo.url_blank;
    this.url_link_node_id = siteMapInfo.url_link_node_id;
    this.url_type = siteMapInfo.url_type;
    // CONTENT
    this.content_path = siteMapInfo.content_path;
    this.meta_description = siteMapInfo.meta_description;
    this.meta_image = siteMapInfo.meta_image;
    this.meta_keyword = siteMapInfo.meta_keyword;
    this.meta_title = siteMapInfo.meta_title;
  }
}

@Component({
  selector: 'cms-sitemap-node-update',
  templateUrl: './sitemap-node-update.component.html',
  styleUrls: ['./sitemap-node-update.component.css']
})
export class SitemapNodeUpdateComponent implements OnInit, OnChanges {

  @ViewChild('form') form: NgForm;

  NodeType = NodeType;
  UrlType = UrlType;

  @Input() sitemap: SiteMapInfo;
  @Input() parent_id: string;

  sitemapMaintainModel: SiteMapUpdateModel;

  urlTypeOptions: { value: UrlType, name: string }[] = [
    { value: UrlType.Inside, name: '站內' },
    { value: UrlType.Outside, name: '站外' },
  ];

  urlBlankTypeOptions: { value: UrlBlankType, name: string }[] = [
    { value: UrlBlankType.Yes, name: '是' },
    { value: UrlBlankType.No, name: '否' },
  ];

  nodeTypeOptions: { value: NodeType, name: string }[] = [
    { value: NodeType.None, name: '無' },
    { value: NodeType.Url, name: '連結' },
    { value: NodeType.Content, name: '頁面' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.sitemapMaintainModel = new SiteMapUpdateModel(this.sitemap, this.parent_id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sitemap']) {
      this.sitemapMaintainModel = new SiteMapUpdateModel(changes['sitemap'].currentValue, this.parent_id);
      if (this.form) {
        for (let controlName of Object.keys(this.form.controls)) {
          const c = this.form.controls[controlName];
          c.markAsUntouched();
          c.markAsPristine();
        }
      }
    }
    if (changes['parent_id']) {
      if (this.sitemapMaintainModel) {
        this.sitemapMaintainModel.parent_id = changes['parent_id'].currentValue;
      }
    }
  }

  getStartEndTime(timeObj: { start_time: string, end_time: string }): string {
    return !timeObj ? '' : [timeObj.start_time || 'unknown', timeObj.end_time || 'unknown'].join(' / ');
  }

  onNodeTypeChange(event) {
    console.warn('onNodeTypeChange() event = ', event);
  }

}
