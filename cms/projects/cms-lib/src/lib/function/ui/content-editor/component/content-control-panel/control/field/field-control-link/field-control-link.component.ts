import { Component, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { TemplateFieldSelectEvent, LinkFieldInfo, LinkFieldInfoUrlType } from '@neux/render';
import { ContentControlBase } from '../../_base';
import { SitemapService } from '../../../../../../../../global/api/service';
import { SiteInfoModel } from '../../../../../../../../global/api/data-model/models/site-info.model';
import { SiteMapGetResponseModel } from '../../../../../../../../global/api/data-model/models/site-map-get-response.model';
import { CmsErrorHandler } from '../../../../../../../../global/error-handling';
import { CustomAction, CustomActionInfo } from '../../../../../../../../global/interface/cms-custom-action.interface';
import { CMS_CUSTOM_ACTION_TOKEN } from '../../../../../../../../global/injection-token';

@Component({
  selector: 'cms-field-control-link',
  templateUrl: './field-control-link.component.html',
  styleUrls: ['./field-control-link.component.scss']
})
export class FieldControlLinkComponent extends ContentControlBase implements OnInit, OnChanges {


  fieldInfo: LinkFieldInfo;
  LinkFieldInfoUrlType = LinkFieldInfoUrlType;

  sites$: Observable<SiteInfoModel[]>;
  refreshNodes$ = new BehaviorSubject(undefined);
  nodes$: Observable<SiteMapGetResponseModel[]>;

  customActions: CustomAction[];
  isLink = true;
  constructor(
    private sitemapService: SitemapService,
    @Inject(CMS_CUSTOM_ACTION_TOKEN) customActionInfo: CustomActionInfo
  ) {
    super();
    this.customActions = customActionInfo.datas;
  }

  ngOnInit(): void {
    this.sites$ = this.sitemapService.getSiteList();
    this.nodes$ = this.getNodes();
  }

  getNodes() {
    return this.refreshNodes$.pipe(switchMap(_ =>
      (
        this.fieldInfo?.extension?.siteId
          ? this.sitemapService.getCMSSiteMap(this.fieldInfo.extension.siteId).pipe(
            CmsErrorHandler.rxHandleError((error, showMessage) => {
              this.fieldInfo.extension.siteId = '';
              this.nodes$ = this.getNodes();
              showMessage();
            })
          )
          : of([])
      ).pipe(
        map(nodes => this.sitemapService.flattenNodes(nodes).filter(node => node.contentType === 'CONTENT'))
      )
    ));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const selected = changes.selected.currentValue as TemplateFieldSelectEvent;
      this.fieldInfo = selected.fieldInfo as LinkFieldInfo;
      this.fieldInfo.extension = this.fieldInfo.extension || {} as any;
      this.fieldInfo.extension.isTargetBlank = this.fieldInfo.extension.isTargetBlank ? 'true' : 'false';
      this.fieldInfo.extension.urlType = this.fieldInfo.extension.urlType || LinkFieldInfoUrlType.INSIDE;
      this.fieldInfo.extension.siteId = this.fieldInfo.extension.siteId || '';
      this.fieldInfo.extension.actionID = this.fieldInfo.extension.actionID || '';
      this.isLink = !!!this.fieldInfo.extension.actionID;
    }
  }

  onUrlTypeChange(fieldInfo: LinkFieldInfo) {
    fieldInfo.fieldVal = '';
    fieldInfo.extension.siteId = '';
  }

  onSiteChange(fieldInfo: LinkFieldInfo) {
    const siteId = fieldInfo.extension.siteId;
    if (siteId) {
      this.refreshNodes$.next(undefined);
    }
  }

  /**
   * 切換TAB
   */
  btnChange() {
    this.fieldInfo.extension.actionID = '';
    this.change.emit();
  }




}
