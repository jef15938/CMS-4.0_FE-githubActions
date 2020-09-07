import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ContentControlBase } from '../../_base';
import { TemplateFieldSelectEvent, LinkFieldInfo, LinkFieldInfoUrlType } from '@neux/render';
import { SitemapService } from '../../../../../../../../global/api/service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { SiteInfoModel } from '../../../../../../../../global/api/data-model/models/site-info.model';
import { SiteMapGetResponseModel } from '../../../../../../../../global/api/data-model/models/site-map-get-response.model';

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

  constructor(
    private sitemapService: SitemapService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.sites$ = this.sitemapService.getSiteList();
    this.nodes$ = this.refreshNodes$.pipe(switchMap(_ =>
      (
        this.fieldInfo?.extension.siteId
          ? this.sitemapService.getCMSSiteMap(this.fieldInfo?.extension.siteId)
          : of([])
      ).pipe(
        map(nodes => this.sitemapService.flattenNodes(nodes))
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

}
