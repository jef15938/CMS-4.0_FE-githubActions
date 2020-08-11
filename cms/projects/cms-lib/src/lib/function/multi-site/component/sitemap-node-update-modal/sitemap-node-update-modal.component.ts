import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../ui/modal';
import { SiteMapNodeGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapNodeGetResponse';
import { UserSiteMapPutRequest } from '../../../../global/api/neuxAPI/bean/UserSiteMapPutRequest';
import { SitemapService } from '../../../../global/api/service/sitemap/sitemap.service';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../../../global/enum';
import { GallerySharedService } from '../../../ui/gallery-shared/service/gallery-shared.service';
import { GalleryInfo } from 'projects/cms-lib/src/lib/global/api/neuxAPI/bean/GalleryInfo';
import { SiteNodeDetailInfo } from 'projects/cms-lib/src/lib/global/api/neuxAPI/bean/SiteNodeDetailInfo';

@Component({
  selector: 'cms-sitemap-node-update-modal',
  templateUrl: './sitemap-node-update-modal.component.html',
  styleUrls: ['./sitemap-node-update-modal.component.scss']
})
export class SitemapNodeUpdateModalComponent extends CustomModalBase implements OnInit {
  title = '修改節點';
  actions: CustomModalActionButton[];

  SiteMapNodeType = SiteMapNodeType;
  SiteMapUrlType = SiteMapUrlType;

  urlTypeOptions: { value: SiteMapUrlType, name: string }[] = [
    { value: SiteMapUrlType.INSIDE, name: '站內' },
    { value: SiteMapUrlType.OUTSIDE, name: '站外' },
  ];

  urlBlankTypeOptions: { value: SiteMapUrlBlankType, name: string }[] = [
    { value: SiteMapUrlBlankType.YES, name: '是' },
    { value: SiteMapUrlBlankType.NO, name: '否' },
  ];

  nodeTypeOptions: { value: SiteMapNodeType, name: string }[] = [
    { value: SiteMapNodeType.NONE, name: '無' },
    { value: SiteMapNodeType.URL, name: '連結' },
    { value: SiteMapNodeType.CONTENT, name: '頁面' },
  ];

  @Input() parentID: string;
  @Input() sitemapNode: SiteMapNodeGetResponse;

  putRequest: UserSiteMapPutRequest;

  constructor(
    private sitemapService: SitemapService,
    private gallerySharedService: GallerySharedService,
  ) { super(); }

  ngOnInit(): void {
    this.putRequest = this.wrapSiteMapNodeGetResponseToUserSiteMapPutRequest(this.sitemapNode, this.parentID);
  }

  compareOptionWithModel(optionValue: any, modelValue: any): boolean {
    return optionValue === modelValue || (!optionValue && !modelValue);
  }

  private wrapSiteMapNodeGetResponseToUserSiteMapPutRequest(
    sitemapNode: SiteMapNodeGetResponse,
    parentID: string
  ): UserSiteMapPutRequest {
    const model = new UserSiteMapPutRequest();
    model.parent_id = parentID || '';
    model.content_path = sitemapNode.content_path;
    model.details = JSON.parse(JSON.stringify(sitemapNode.details || []));
    model.url = sitemapNode.url;
    model.url_blank = sitemapNode.url_blank;
    model.url_link_node_id = sitemapNode.url_link_node_id;
    model.url_type = sitemapNode.url_type;
    return model;
  }

  confirm() {
    this.sitemapService.updateSiteNode(
      this.sitemapNode.node_id,
      this.putRequest.details,
      this.putRequest
    ).subscribe(_ => {
      this.close('Updated');
    });
  }

  openGallery(detail: SiteNodeDetailInfo) {
    return this.gallerySharedService.openImgGallery().subscribe((selected: GalleryInfo) => {
      if (selected) {
        detail.meta_image_name = selected.file_name;
        detail.meta_image = `${selected.gallery_id}`;
      }
    });
  }

}
