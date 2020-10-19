import { Component, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { LinkFieldInfoUrlType } from '@neux/render';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { SiteInfoModel } from '../../../../../global/api/data-model/models/site-info.model';
import { SiteMapGetResponseModel } from '../../../../../global/api/data-model/models/site-map-get-response.model';
import { SitemapService } from '../../../../../global/api/service';
import { CmsErrorHandler } from '../../../../../global/error-handling';

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
export class HtmlEditorCreateLinkModalComponent extends CustomModalBase<HtmlEditorCreateLinkModalComponent, ATagConfig> implements OnInit {

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
    this.nodes$ = this.getNodes();
  }

  getNodes() {
    return this.refreshNodes$.pipe(switchMap(_ =>
      (
        this.aTagConfig?.siteId
          ? this.sitemapService.getCMSSiteMap(this.aTagConfig.siteId).pipe(
            CmsErrorHandler.rxHandleError((error, showMessage) => {
              this.aTagConfig.siteId = null;
              this.nodes$ = this.getNodes();
              showMessage();
            })
          )
          : of([])
      ).pipe(
        map(nodes => this.sitemapService.flattenNodes(nodes))
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
