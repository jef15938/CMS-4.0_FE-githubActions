import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { ContentInfo, ContentTemplateInfo } from '../../interface';
import { RenderService } from '../../service/render.service';
import { PageInfo } from '../../interface/page-info.interface';

@Component({
  selector: 'lib-render',
  templateUrl: './render.component.html',
  styles: [
  ]
})
export class RenderComponent implements OnInit {

  templates: ContentTemplateInfo[];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const pageInfo: PageInfo = this.activatedRoute.snapshot.data.pageInfo;
    const languageID: string = this.activatedRoute.snapshot.queryParams.lang;
    this.templates = this.getTemplateInfoByLanguageId(pageInfo.content, languageID);
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

    const templatesByLanguage: ContentTemplateInfo[] = languageInfoList.find(lang => lang.language_id === languageID)?.templates;
    // 回傳對應 languageID 的資料 || []
    return templatesByLanguage || [];
  }

}
