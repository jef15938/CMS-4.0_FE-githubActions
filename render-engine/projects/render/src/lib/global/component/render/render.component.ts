import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentInfo, ContentTemplateInfo } from '../../interface';
import { PageData } from '../../types';
import { LayoutInfo } from '../../interface/layout-info.interface';

@Component({
  selector: 'rdr-render',
  templateUrl: './render.component.html',
  styles: [
  ]
})
export class RenderComponent implements OnInit {

  templates: LayoutInfo[];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const { pageInfo, sitemap, contentInfo } = this.activatedRoute.snapshot.data.data as PageData;
    const templateList = this.getTemplateInfoByLanguageId(contentInfo, pageInfo.lang);
    // 把最外層Layout也放入TemplateList中，sitemap當作Data
    this.templates = [{
      id: '',
      templateId: pageInfo.layoutID,
      fields: [],
      children: templateList,
      attributes: {
        sitemap
      }
    }];
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
  private getTemplateInfoByLanguageId(contentInfo: ContentInfo, languageID: string): ContentTemplateInfo[] {
    // 異常資料處理
    if (!contentInfo || !languageID) { return []; }
    const languageInfoList = contentInfo.languages;
    if (!languageInfoList?.length) { return []; }

    const templatesByLanguage: ContentTemplateInfo[] = languageInfoList.find(lang => lang.languageID === languageID)?.templates;
    // 回傳對應 languageID 的資料 || []
    return templatesByLanguage || [];
  }

}
