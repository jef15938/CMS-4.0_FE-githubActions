import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from '../../types';
import { LayoutInfo } from '../../interface/layout-info.interface';
import { ContentInfoModel } from '../../api/data-model/models/content-info.model';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { SiteMapGetResponseModel } from '../../api/data-model/models/site-map-get-response.model';

@Component({
  selector: 'rdr-render',
  templateUrl: './render.component.html',
  styles: [
  ]
})
export class RenderComponent implements OnInit {

  templates: LayoutInfo[];
  runtime = false;
  sites: SiteMapGetResponseModel = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    this.runtime = url.indexOf('/preview/') < 0;

    const { pageInfo, sitemap, contentInfo } = this.activatedRoute.snapshot.data.data as PageData;

    this.sites = sitemap;

    const templateList = this.getTemplateInfoByLanguageId(contentInfo, pageInfo.lang);
    // 把最外層Layout也放入TemplateList中，sitemap當作Data
    this.templates = [{
      id: '',
      templateId: pageInfo.layoutId,
      fields: [],
      children: templateList,
      attributes: {
        sitemap: null // TODO: 修正
      }
    }];
    console.warn('this.templates = ', this.templates);
  }

  /**
   * 根據語系回傳對應contentInfo
   *
   * @private
   * @param {ContentInfo} contentInfo
   * @param {string} languageID
   * @returns {ContentTemplateInfo[]}
   * @memberof RenderComponent
   */
  private getTemplateInfoByLanguageId(contentInfo: ContentInfoModel, languageID: string): ContentTemplateInfoModel[] {
    // 異常資料處理
    if (!contentInfo || !languageID) { return []; }
    const languageInfoList = contentInfo.languages;
    if (!languageInfoList?.length) { return []; }

    const templatesByLanguage: ContentTemplateInfoModel[] =
      languageInfoList.find(lang => lang.languageId === languageID)?.blocks
        .map(b => b.templates).reduce((a, b) => a.concat(b || []), [] as ContentTemplateInfoModel[]);
    // 回傳對應 languageID 的資料 || []
    return templatesByLanguage || [];
  }

}
