import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SiteMapNodeGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapNodeGetResponse';
import { ModalService } from '../../../ui/modal';
import { SitemapService, ContentService } from '../../../../global/api/service';
import { ContentEditorService } from '../../../ui/content-editor';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../../../global/enum/multi-site.enum';
import { AuditingSitemapModalComponent } from '../auditing-sitemap-modal/auditing-sitemap-modal.component';
import { PreviewInfoType } from '../../../../global/api/neuxAPI/bean/PreviewInfo';
import { FarmSharedService } from '../../../ui/farm-shared/farm-shared.service';
import { SitemapNodeUpdateModalComponent } from '../sitemap-node-update-modal/sitemap-node-update-modal.component';
import { SiteMapGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapGetResponse';

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
  @Input() userSitemap: SiteMapGetResponse;
  @Input() sitemapNodeParentID: string;
  @Input() sitemapNode: SiteMapNodeGetResponse;

  @Output() update = new EventEmitter<SiteMapNodeGetResponse>();

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
    const nodeID = this.sitemapNode.node_id;
    this.sitemapService.getPreviewInfo(nodeID, languageID).subscribe(previewInfo => {
      switch (previewInfo.preview_type) {
        case PreviewInfoType.ONE_PAGE:
          window.open(previewInfo.url, '_blank', 'noopener=yes,noreferrer=yes');
          break;
        case PreviewInfoType.FARM:
          this.farmSharedService.openFarmPreview(previewInfo.func_id, previewInfo.data_id).subscribe();
          break;
      }
    });
  }

  editContent() {
    if (!this.userSitemap.canModify) { return; }

    const noteType = this.sitemapNode.node_type;
    const controlID = this.sitemapNode.node_id;
    const contentID = this.sitemapNode.content_id || controlID;

    switch (noteType) {
      case SiteMapNodeType.CONTENT:
        this.contentEditorService.openEditorByContentID(contentID, controlID).subscribe(_ => this.update.emit(this.sitemapNode));
        break;
      case SiteMapNodeType.FARM:
        const funcID = this.sitemapNode.func_id;
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
