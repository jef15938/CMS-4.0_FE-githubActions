import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { SitemapService, ContentService, GroupService } from '../../../../global/api/service';
import { CustomModalBase } from './../../../ui/modal';
import { SiteMapNodeType, SiteMapUrlType, SiteMapNodeDeviceType, SiteMapNodeDeviceTypeName } from '../../../../global/enum/multi-site.enum';
import { GallerySharedService } from '../../../ui/gallery-shared/service/gallery-shared.service';
import { GroupInfoModel } from '../../../../global/api/data-model/models/group-info.model';
import { LayoutInfoModel } from '../../../../global/api/data-model/models/layout-info.model';
import { UserSiteMapPostRequestModel } from '../../../../global/api/data-model/models/user-sitemap-post-request.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { CmsLoadingToggle } from '../../../../global/service';
import { MultiSiteConst } from '../../const/multi-site-const';

class SiteMapCreateModel extends UserSiteMapPostRequestModel {

  constructor(parentId: string) {
    super();
    this.parentId = parentId;
  }

  private clearLink() {
    this.url = undefined;
    this.urlBlank = undefined;
    this.urlLinkNodeId = undefined;
    this.urlType = undefined;
  }

  private clearContent() {
    this.layoutId = undefined;
    this.contentPath = undefined;
    this.metaDescription = undefined;
    this.metaImage = undefined;
    this.metaKeyword = undefined;
  }

  checkFieldsByNodeType() {
    switch (this.nodeType) {
      case null:
        this.clearLink();
        this.clearContent();
        break;
      case SiteMapNodeType.URL:
        this.clearContent();
        break;
      case SiteMapNodeType.CONTENT:
        this.clearLink();
        break;
    }
  }
}

@Component({
  selector: 'cms-sitemap-node-create-modal',
  templateUrl: './sitemap-node-create-modal.component.html',
  styleUrls: ['./sitemap-node-create-modal.component.scss']
})
export class SitemapNodeCreateModalComponent extends CustomModalBase<SitemapNodeCreateModalComponent, 'Success'> implements OnInit {
  title = '新增節點';

  NodeType = SiteMapNodeType;
  UrlType = SiteMapUrlType;
  SiteMapNodeDeviceType = SiteMapNodeDeviceType;
  SiteMapNodeDeviceTypeName = SiteMapNodeDeviceTypeName;

  @Input() siteId: string;
  @Input() parentId: string;

  activedLayoutID: string;

  sitemapMaintainModel: SiteMapCreateModel;
  layouts: LayoutInfoModel[] = [];
  groups: GroupInfoModel[] = [];
  assignGroupIds: string[] = [];

  urlTypeOptions = MultiSiteConst.urlTypeOptions;
  urlBlankTypeOptions = MultiSiteConst.urlBlankTypeOptions;
  nodeTypeOptions = MultiSiteConst.nodeTypeOptions;
  deviceTypeOptions = MultiSiteConst.deviceTypeOptions;

  metaImageName = '';

  constructor(
    private sitemapService: SitemapService,
    private contentService: ContentService,
    private gallerySharedService: GallerySharedService,
    private groupService: GroupService,
    private cmsLoadingToggle: CmsLoadingToggle,
  ) { super(); }

  ngOnInit(): void {
    this.sitemapMaintainModel = new SiteMapCreateModel(this.parentId);
    this.getLayouts().subscribe();
    this.getGroups().subscribe();
  }

  getGroups() {
    return this.groupService.getGroupList().pipe(
      CmsErrorHandler.rxHandleError(),
      tap(groups => this.groups = groups)
    );
  }

  getLayouts() {
    return this.contentService.getLayout().pipe(
      CmsErrorHandler.rxHandleError(),
      tap(layouts => this.layouts = layouts)
    );
  }

  confirm() {
    this.sitemapMaintainModel.assignGroupId = this.assignGroupIds.join(',');
    this.cmsLoadingToggle.open();
    this.sitemapService.createSiteNode(this.siteId, this.sitemapMaintainModel).pipe(
      CmsErrorHandler.rxHandleError((error, showMessage) => {
        this.cmsLoadingToggle.close();
        showMessage();
      })
    ).subscribe(_ => {
      this.cmsLoadingToggle.close();
      this.close('Success');
    });
  }

  compareOptionWithModel(optionValue: any, modelValue: any): boolean {
    return optionValue === modelValue || (!optionValue && !modelValue);
  }

  onSelectedLayoutCheckedChange(ev: MatCheckboxChange, layout: LayoutInfoModel) {
    if (ev.checked) {
      this.sitemapMaintainModel.layoutId = layout.layoutId;
    } else {
      this.sitemapMaintainModel.layoutId = undefined;
    }
  }

  setActivedLayout(layout: LayoutInfoModel, actived: boolean) {
    if (actived) {
      this.activedLayoutID = layout.layoutId;
    } else if (this.activedLayoutID === layout.layoutId) {
      this.activedLayoutID = undefined;
    }
  }

  selectedLayout(layout: LayoutInfoModel, layoutSelect: MatSelect) {
    this.sitemapMaintainModel.layoutId = layout.layoutId;
    layoutSelect.close();
  }

  cancelEvent(ev: MouseEvent) {
    ev.stopPropagation();
    ev.preventDefault();
  }

  selectImage() {
    const galleryID = this.sitemapMaintainModel.metaImage;
    const galleryName = this.metaImageName;
    (
      galleryID
        ? this.gallerySharedService.updateGalleryImage(`${galleryID}`, galleryName, null, null)
        : this.gallerySharedService.addGalleryImage('', null)
    ).subscribe(res => {
      if (res) {
        if (res) {
          this.metaImageName = res.galleryName;
          this.sitemapMaintainModel.metaImage = `${res.galleryId}`;
        }
      }
    });
  }

  onDeviceCheckboxChange(ev: MatCheckboxChange, siteMapNodeDeviceType: SiteMapNodeDeviceType) {
    let devices = (this.sitemapMaintainModel.device || '').split(',').filter(v => !!v);
    console.warn(ev.checked, JSON.parse(JSON.stringify(devices)));
    if (ev.checked && devices.indexOf(siteMapNodeDeviceType) < 0) {
      devices.push(siteMapNodeDeviceType);
    }
    if (!ev.checked && devices.indexOf(siteMapNodeDeviceType) > -1) {
      devices = devices.filter(v => v !== siteMapNodeDeviceType);
    }
    this.sitemapMaintainModel.device = devices.join(',');
  }

}
