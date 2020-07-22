import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { ContentInfo, ContentTemplateInfo } from '../../interface';
import { RenderService } from '../../service/render.service';

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
    private renderService: RenderService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      concatMap(params => {
        const contentID = params.contentID;
        const languageID = params.languageID;
        // tslint:disable-next-line: no-string-literal
        return this.renderService.getContentInfo(contentID).pipe(
          tap(contentInfo => this.templates = this.getTemplateInfoByLanguageId(contentInfo, languageID)),
        );
      })
    ).subscribe();
  }

  private getTemplateInfoByLanguageId(contentInfo: ContentInfo, languageID: string): ContentTemplateInfo[] {
    // 異常資料處理
    if (!contentInfo) { return []; }
    const languages = contentInfo.languages;
    if (!languages?.length) { return []; }

    if (languageID) {  // 有 languageID
      const templatesByLanguage: ContentTemplateInfo[] = languages.find(lang => lang.language_id === languageID)?.templates;
      // 回傳對應 languageID 的資料 || []
      return templatesByLanguage || [];
    } else { // 沒有 languageID
      // 回傳 default language 的資料
      const templatesByDefaultLanguage = languages.find(lang => lang.is_default)?.templates;
      return templatesByDefaultLanguage || languages[0]?.templates || [];
    }
  }

}
