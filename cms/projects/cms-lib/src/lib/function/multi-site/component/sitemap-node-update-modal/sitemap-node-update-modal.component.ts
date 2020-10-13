import { Component, OnInit, Input } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { CustomModalBase, CustomModalActionButton } from './../../../ui/modal';
import { SitemapService } from '../../../../global/api/service/sitemap/sitemap.service';
import { SiteMapNodeType, SiteMapUrlType, SiteMapNodeDeviceType, SiteMapNodeDeviceTypeName } from '../../../../global/enum';
import { GallerySharedService } from '../../../ui/gallery-shared/service/gallery-shared.service';
import { SiteMapNodeGetResponseModel } from '../../../../global/api/data-model/models/site-map-node-get-response.model';
import { UserSiteMapPutRequestModel } from '../../../../global/api/data-model/models/user-sitemap-put-request.model';
import { SiteNodeDetailInfoModel } from '../../../../global/api/data-model/models/site-node-detail-info.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { CmsLoadingToggle } from '../../../../global/service/cms-loading-toggle.service';
import { MultiSiteConst } from '../../const/multi-site-const';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'cms-sitemap-node-update-modal',
  templateUrl: './sitemap-node-update-modal.component.html',
  styleUrls: ['./sitemap-node-update-modal.component.scss']
})
export class SitemapNodeUpdateModalComponent extends CustomModalBase<SitemapNodeUpdateModalComponent, 'Success'> implements OnInit {
  title = '修改節點';
  actions: CustomModalActionButton[];

  SiteMapNodeType = SiteMapNodeType;
  SiteMapUrlType = SiteMapUrlType;
  SiteMapNodeDeviceType = SiteMapNodeDeviceType;
  SiteMapNodeDeviceTypeName = SiteMapNodeDeviceTypeName;

  urlTypeOptions = MultiSiteConst.urlTypeOptions;
  urlBlankTypeOptions = MultiSiteConst.urlBlankTypeOptions;
  nodeTypeOptions = MultiSiteConst.nodeTypeOptions;
  deviceTypeOptions = MultiSiteConst.deviceTypeOptions;

  @Input() parentID: string;
  @Input() sitemapNode: SiteMapNodeGetResponseModel;

  putRequest: UserSiteMapPutRequestModel;

  constructor(
    private sitemapService: SitemapService,
    private gallerySharedService: GallerySharedService,
    private cmsLoadingToggle: CmsLoadingToggle,
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
    model.details = [...(sitemapNode.details || []).map(detail => plainToClass(SiteNodeDetailInfoModel, detail))];
    model.url = sitemapNode.url;
    model.urlBlank = sitemapNode.urlBlank;
    model.urlLinkNodeId = sitemapNode.urlLinkNodeId;
    model.urlType = sitemapNode.urlType;
    model.isMegaMenu = sitemapNode.isMegaMenu;
    return model;
  }

  confirm() {
    this.cmsLoadingToggle.open();
    this.sitemapService.updateSiteNode(
      this.sitemapNode.nodeId,
      this.putRequest.details,
      this.putRequest
    ).pipe(
      CmsErrorHandler.rxHandleError((error, showMessage) => {
        this.cmsLoadingToggle.close();
        showMessage();
      })
    ).subscribe(_ => {
      this.cmsLoadingToggle.close();
      this.close('Success');
    });
  }

  selectImage(detail: SiteNodeDetailInfoModel) {
    const galleryID = detail.metaImage;
    const galleryName = detail.metaImageName;
    (
      galleryID
        ? this.gallerySharedService.updateGalleryImage(`${galleryID}`, galleryName, null, null)
        : this.gallerySharedService.addGalleryImage('', null)
    ).subscribe(res => {
      if (res) {
        if (res) {
          detail.metaImageName = res.galleryName;
          detail.metaImage = `${res.galleryId}`;
        }
      }
    });
  }

  onDeviceCheckboxChange(ev: MatCheckboxChange, siteMapNodeDeviceType: SiteMapNodeDeviceType) {
    let devices = (this.sitemapNode.device || '').split(',').filter(v => !!v);
    console.warn(ev.checked, JSON.parse(JSON.stringify(devices)));
    if (ev.checked && devices.indexOf(siteMapNodeDeviceType) < 0) {
      devices.push(siteMapNodeDeviceType);
    }
    if (!ev.checked && devices.indexOf(siteMapNodeDeviceType) > -1) {
      devices = devices.filter(v => v !== siteMapNodeDeviceType);
    }
    this.sitemapNode.device = devices.join(',');
  }

}
