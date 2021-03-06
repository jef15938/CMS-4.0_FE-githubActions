import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { LinkFieldInfoUrlType, CustomActionInfo, CustomAction } from '@neux/render';
import { CustomModalBase } from '../../../modal';
import { SiteInfoModel } from '../../../../../global/api/data-model/models/site-info.model';
import { SiteMapGetResponseModel } from '../../../../../global/api/data-model/models/site-map-get-response.model';
import { SitemapService } from '../../../../../global/api/service';
import { CmsErrorHandler } from '../../../../../global/error-handling';
import { CMS_CUSTOM_ACTION_TOKEN } from '../../../../../global/injection-token';


export interface ATagConfig {
  href: string;
  text: string;
  target: string;
  urlType: LinkFieldInfoUrlType;
  siteId: string;
  actionID?: string;
}

@Component({
  selector: 'cms-html-editor-create-link-modal',
  templateUrl: './html-editor-create-link-modal.component.html',
  styleUrls: ['./html-editor-create-link-modal.component.scss']
})
export class HtmlEditorCreateLinkModalComponent extends CustomModalBase<HtmlEditorCreateLinkModalComponent, ATagConfig> implements OnInit {

  LinkFieldInfoUrlType = LinkFieldInfoUrlType;

  title = '';

  @Input() aTag: HTMLAnchorElement;
  @Input() canModifyText: boolean;
  @Input() isGallery = false;

  sites$: Observable<SiteInfoModel[]>;
  refreshNodes$ = new BehaviorSubject(undefined);
  nodes$: Observable<SiteMapGetResponseModel[]>;

  aTagConfig: ATagConfig;

  customActions: CustomAction[];
  isLink = true;
  constructor(
    private sitemapService: SitemapService,
    @Optional() @Inject(CMS_CUSTOM_ACTION_TOKEN) customActionInfo: CustomActionInfo
  ) {
    super();
    this.customActions = customActionInfo.datas || [];
  }

  ngOnInit(): void {
    this.aTagConfig = {
      href: this.aTag.getAttribute('href'),
      text: this.aTag.text,
      target: this.aTag.target,
      siteId: this.aTag.getAttribute('siteId') || '',
      actionID: this.aTag.getAttribute('actionID') || '',
      urlType:
        this.aTag.getAttribute('urlType') === LinkFieldInfoUrlType.OUTSITE
          || this.aTag.getAttribute('urlType') === LinkFieldInfoUrlType.INSIDE
          ? this.aTag.getAttribute('urlType') as LinkFieldInfoUrlType
          : LinkFieldInfoUrlType.OUTSITE,

    };

    this.sites$ = this.sitemapService.getSiteList();
    this.nodes$ = this.getNodes();
    this.isLink = !!!this.aTag.getAttribute('actionID');
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

  btnChange() {
    this.aTagConfig.actionID = '';
  }
}

