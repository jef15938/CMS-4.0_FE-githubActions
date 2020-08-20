import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalService } from '../../../ui/modal';
import { SitemapService, ContentService } from '../../../../global/api/service';
import { ContentEditorService } from '../../../ui/content-editor';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../../../global/enum/multi-site.enum';
import { AuditingSitemapModalComponent } from '../auditing-sitemap-modal/auditing-sitemap-modal.component';
import { FarmSharedService } from '../../../ui/farm-shared/farm-shared.service';
import { SitemapNodeUpdateModalComponent } from '../sitemap-node-update-modal/sitemap-node-update-modal.component';
import { PreviewInfoType } from '../../../../global/api/data-model/models/preview-info.model';
import { SiteMapNodeGetResponseModel } from '../../../../global/api/data-model/models/site-map-node-get-response.model';
import { SiteMapGetResponseModel } from '../../../../global/api/data-model/models/site-map-get-response.model';

@Component({
  selector: 'cms-sitemap-node-detail',
  templateUrl: './sitemap-node-detail.component.html',
  styleUrls: ['./sitemap-node-detail.component.scss']
})
export class SitemapNodeDetailComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  SiteMapNodeType = SiteMapNodeType;
  SiteMapUrlType = SiteMapUrlType;

  @Input() siteID: string;
  @Input() userSitemap: SiteMapGetResponseModel;
  @Input() sitemapNodeParentID: string;
  @Input() sitemapNode: SiteMapNodeGetResponseModel;

  @Output() update = new EventEmitter<SiteMapNodeGetResponseModel>();

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

  constructor(
    private modalService: ModalService,
    private contentService: ContentService,
    private contentEditorService: ContentEditorService,
    private sitemapService: SitemapService,
    private farmSharedService: FarmSharedService,
  ) { }

  ngOnInit(): void { }

  compareOptionWithModel(optionValue: any, modelValue: any): boolean {
    return optionValue === modelValue || (!optionValue && !modelValue);
  }

  preview(languageID: string) {
    if (!this.userSitemap.canPreview) { return; }
    const nodeID = this.sitemapNode.nodeId;
    this.sitemapService.getPreviewInfo(nodeID, languageID).subscribe(previewInfo => {
      switch (previewInfo.previewType) {
        case PreviewInfoType.ONE_PAGE:
          window.open(previewInfo.url, '_blank', 'noopener=yes,noreferrer=yes');
          break;
        case PreviewInfoType.FARM:
          this.farmSharedService.openFarmPreview(previewInfo.funcId, previewInfo.dataId).subscribe();
          break;
      }
    });
  }

  editContent() {
    if (!this.userSitemap.canModify) { return; }

    const noteType = this.sitemapNode.nodeType;
    const controlID = this.sitemapNode.layoutId;
    const contentID = this.sitemapNode.contentId;

    switch (noteType) {
      case SiteMapNodeType.CONTENT:
        this.contentEditorService.openEditorByContentID(contentID, controlID).subscribe(_ => this.update.emit(this.sitemapNode));
        break;
      case SiteMapNodeType.FARM:
        const funcID = this.sitemapNode.funcId;
        this.farmSharedService.openFarm(funcID).subscribe(_ => this.update.emit(this.sitemapNode));
        break;
    }
  }

  auditingSiteMap() {
    this.modalService.openComponent({
      component: AuditingSitemapModalComponent,
      componentInitData: {
        siteId: this.siteID,
        sitemapNode: this.sitemapNode
      }
    }).subscribe(res => {
      if (res) {
        alert('送審成功');
        this.update.emit(this.sitemapNode);
      }
    });
  }

  editSitemapNode() {
    this.modalService.openComponent({
      component: SitemapNodeUpdateModalComponent,
      componentInitData: {
        parentID: this.sitemapNodeParentID,
        sitemapNode: this.sitemapNode
      }
    }).subscribe(res => {
      if (res) {
        alert('修改成功');
        this.update.emit(this.sitemapNode);
      }
    });
  }

}
