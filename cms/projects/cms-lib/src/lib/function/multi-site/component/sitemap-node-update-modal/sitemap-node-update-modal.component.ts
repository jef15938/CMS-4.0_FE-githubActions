import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../ui/modal';
import { SitemapService } from '../../../../global/api/service/sitemap/sitemap.service';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../../../global/enum';
import { GallerySharedService } from '../../../ui/gallery-shared/service/gallery-shared.service';
import { GalleryInfo } from '../../../../global/api/neuxAPI/bean/GalleryInfo';
import { SiteMapNodeGetResponseModel } from '../../../../global/api/data-model/models/site-map-node-get-response.model';
import { UserSiteMapPutRequestModel } from '../../../../global/api/data-model/models/user-sitemap-put-request.model';
import { SiteNodeDetailInfoModel } from '../../../../global/api/data-model/models/site-node-detail-info.model';

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
  @Input() sitemapNode: SiteMapNodeGetResponseModel;

  putRequest: UserSiteMapPutRequestModel;

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
    sitemapNode: SiteMapNodeGetResponseModel,
    parentID: string
  ): UserSiteMapPutRequestModel {
    const model = new UserSiteMapPutRequestModel();
    model.parentId = parentID || '';
    model.contentPath = sitemapNode.contentPath;
    model.details = [...sitemapNode.details];
    model.url = sitemapNode.url;
    model.urlBlank = sitemapNode.urlBlank;
    model.urlLinkNodeId = sitemapNode.urlLinkNodeId;
    model.urlType = sitemapNode.urlType;
    return model;
  }

  confirm() {
    this.sitemapService.updateSiteNode(
      this.sitemapNode.nodeId,
      this.putRequest.details,
      this.putRequest
    ).subscribe(_ => {
      this.close('Updated');
    });
  }

  openGallery(detail: SiteNodeDetailInfoModel) {
    return this.gallerySharedService.openImgGallery().subscribe((selected: GalleryInfo) => {
      if (selected) {
        detail.metaImageName = selected.file_name;
        detail.metaImage = `${selected.gallery_id}`;
      }
    });
  }

}
