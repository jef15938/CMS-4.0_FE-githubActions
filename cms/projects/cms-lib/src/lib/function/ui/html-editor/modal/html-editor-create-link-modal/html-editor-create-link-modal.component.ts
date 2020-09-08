import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { LinkFieldInfoUrlType } from '@neux/render';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SiteInfoModel } from '../../../../../global/api/data-model/models/site-info.model';
import { SiteMapGetResponseModel } from '../../../../../global/api/data-model/models/site-map-get-response.model';
import { SitemapService } from '../../../../../global/api/service';
import { switchMap, map } from 'rxjs/operators';
import { ATTRIBUTE_GALLERY_ID } from '../../const/html-editor-container.const';

export interface ATagConfig {
  href: string;
  text: string;
  target: string;
  urlType: LinkFieldInfoUrlType;
  siteId: string;
}

@Component({
  selector: 'cms-html-editor-create-link-modal',
  templateUrl: './html-editor-create-link-modal.component.html',
  styleUrls: ['./html-editor-create-link-modal.component.scss']
})
export class HtmlEditorCreateLinkModalComponent extends CustomModalBase implements OnInit {

  LinkFieldInfoUrlType = LinkFieldInfoUrlType;

  title = '';
  actions: CustomModalActionButton[];

  @Input() aTag: HTMLAnchorElement;
  @Input() canModifyText: boolean;
  @Input() isGallery = false;

  sites$: Observable<SiteInfoModel[]>;
  refreshNodes$ = new BehaviorSubject(undefined);
  nodes$: Observable<SiteMapGetResponseModel[]>;

  aTagConfig: ATagConfig;

  constructor(
    private sitemapService: SitemapService,
  ) { super(); }

  ngOnInit(): void {
    this.aTagConfig = {
      href: this.aTag.getAttribute('href'),
      text: this.aTag.text,
      target: this.aTag.target,
      siteId: this.aTag.getAttribute('siteId') || '',
      urlType:
        this.aTag.getAttribute('urlType') === LinkFieldInfoUrlType.OUTSITE
          || this.aTag.getAttribute('urlType') === LinkFieldInfoUrlType.INSIDE
          ? this.aTag.getAttribute('urlType') as LinkFieldInfoUrlType
          : LinkFieldInfoUrlType.OUTSITE,
    };
    this.sites$ = this.sitemapService.getSiteList();
    this.nodes$ = this.refreshNodes$.pipe(switchMap(_ =>
      (
        this.aTagConfig?.siteId
          ? this.sitemapService.getCMSSiteMap(this.aTagConfig.siteId)
          : of([])
      ).pipe(
        map(nodes => this.sitemapService.flattenNodes(nodes).filter(node => node.contentType === 'CONTENT'))
      )
    ));
  }

  confirm() {
    this.close(this.aTagConfig);
  }

  onUrlTypeChange(aTagConfig: ATagConfig) {
    aTagConfig.href = '';
    aTagConfig.siteId = '';
  }

  onSiteChange(aTagConfig: ATagConfig) {
    const siteId = aTagConfig.siteId;
    if (siteId) {
      this.refreshNodes$.next(undefined);
    }
  }

}
