import { Component, OnInit, Input, ViewChild, Inject, PLATFORM_ID, ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { WithRenderInfo } from '../../../function/wrapper/layout-wrapper/layout-wrapper.interface';
import { TemplatesContainerComponent, LayoutWrapperComponent } from '../../../function/wrapper';
import { PageInfoGetResponseModel } from '../../api/data-model/models/page-info-get-response.model';
import { RenderService } from '../../service/render.service';
import { ContentInfoModel } from '../../api/data-model/models/content-info.model';
import { SiteInfoModel } from '../../api/data-model/models/site-info.model';
import { RenderedPageEnvironment } from '../../interface/page-environment.interface';
import { PreviewCommandType } from '../../enum/preview-command.enum';
import { PreviewCommand, PreviewCommandData } from '../../interface/preview-command.interface';

@Component({
  selector: 'rdr-render-preview-container',
  templateUrl: './render-preview-container.component.html',
  styleUrls: ['./render-preview-container.component.scss']
})
export class RenderPreviewContainerComponent implements WithRenderInfo, OnInit, OnDestroy {

  @ViewChild('previous') previousTemplatesContainerComponent: TemplatesContainerComponent;
  @ViewChild('current') currentTemplatesContainerComponent: TemplatesContainerComponent;

  @Input() templates: ContentTemplateInfoModel[];
  @Input() mode: 'preview' | 'edit';
  @Input() sites: SiteInfoModel[] = [];
  @Input() pageInfo: PageInfoGetResponseModel;
  private destroy$ = new Subject();
  fixed = false;

  previousTemplates;

  isComparing = false;

  constructor(
    private renderService: RenderService,
    @Inject('RENDER_ENGINE_RENDERED_PAGE_ENVIRONMENT') public pageEnv: RenderedPageEnvironment,
    @Inject(PLATFORM_ID) platformId: any,
    @Inject(DOCUMENT) private document: any,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) { }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * 往上找取得a標籤
   * @private
   * @param {EventTarget} target
   * @return {*}  {HTMLAnchorElement}
   * @memberof RenderPreviewContainerComponent
   */
  private getEventTargetPathATag(target: EventTarget): HTMLAnchorElement {
    if (!target) { return null; }
    const t = target as HTMLElement;
    if (t?.tagName?.toLowerCase() === 'a') {
      return t as HTMLAnchorElement;
    }
    return this.getEventTargetPathATag(t.parentElement);
  }

  ngOnInit(): void {
    this.listenToClick();

    // 當自己是 iframe, 接到父層的 postMessage 要做什麼
    window.onmessage = (e) => {
      const command: PreviewCommand<PreviewCommandData> = e.data;
      switch (command.type) {
        case PreviewCommandType.COMPARE_TOGGLE:
          this.toggleCompare();
          break;
        case PreviewCommandType.COMPARE_OFF:
          this.closeCompare();
          break;
      }
    };
  }

  /**
   *
   * 監聽點擊事件處理連結a標籤
   * @private
   * @memberof RenderPreviewContainerComponent
   */
  private listenToClick() {
    fromEvent(this.elementRef.nativeElement, 'click', { capture: true }).pipe(
      takeUntil(this.destroy$)
    ).subscribe((e: Event) => {
      const aTagPassedBy = this.getEventTargetPathATag(e.target);
      if (!aTagPassedBy) { return; }

      const actionID = (aTagPassedBy.getAttribute('actionid') || '').trim();
      if (actionID) { return; }

      const attributeHref = aTagPassedBy.getAttribute('href');
      if (!attributeHref || attributeHref === '#') { return; }
      e.stopPropagation();
      e.preventDefault();

      const reg = new RegExp('^([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://)');
      const isInclude = reg.test(attributeHref);
      const passData = { href: aTagPassedBy.href, target: aTagPassedBy.getAttribute('target') };
      if (aTagPassedBy && isInclude) {
        const previewCommand: PreviewCommand<PreviewCommandData> = { type: PreviewCommandType.LINK, data: passData };
        this.sendCommandToParent(previewCommand);
      }
    });
  }

  private sendCommandToParent(command: PreviewCommand<PreviewCommandData>) {
    window?.parent?.postMessage(command, '*');
  }

  toggleCompare() {
    if (this.isComparing) { // 取消比較
      this.isComparing = !this.isComparing;
      const compareOff: PreviewCommand<PreviewCommandData> = { type: PreviewCommandType.COMPARE_OFF };
      this.sendCommandToParent(compareOff);
      return;
    }

    this.getPreviousVersion().subscribe(_ => {
      if (!this.previousTemplates) {
        alert('沒有之前的版本');
        return;
      }
      this.isComparing = !this.isComparing;
      this.changeDetectorRef.detectChanges();
      this.markVersionDifference();
      const compareOn: PreviewCommand<PreviewCommandData> = { type: PreviewCommandType.COMPARE_ON };
      this.sendCommandToParent(compareOn);
    });
  }

  private getPreviousVersion(): Observable<any> {
    return this.previousTemplates ? of(this.previousTemplates) : this.renderService.getContentInfo('runtime', this.pageInfo.contentId).pipe(
      map(contentTemplateInfo => {
        if (contentTemplateInfo) {
          const templateList = ContentInfoModel.getTemplateInfoByLanguageId(contentTemplateInfo, this.pageInfo.lang);
          return [{
            id: '',
            templateId: this.pageInfo.layoutId,
            fields: [],
            children: templateList,
            attributes: {
              sitemap: null // TODO: 修正
            }
          }];
        }
        return null;
      }),
      tap(previousTemplates => this.previousTemplates = previousTemplates)
    );
  }

  private markVersionDifference() {
    const previous = this.previousTemplatesContainerComponent;
    const current = this.currentTemplatesContainerComponent;
    // console.warn({ previous, current });

    const previousLayoutWrappers = this.getFlattenLayoutWrapper(previous).filter(x => !!x.templateInfo?.id);
    const currentLayoutWrappers = this.getFlattenLayoutWrapper(current).filter(x => !!x.templateInfo?.id);
    // console.warn({ previousLayoutWrappers, currentLayoutWrappers });

    const previousLayoutWrapperTemplateInfoIds = previousLayoutWrappers.map(x => x.templateInfo.id);
    const currentLayoutWrapperTemplateInfoIds = currentLayoutWrappers.map(x => x.templateInfo.id);
    // console.warn({ previousLayoutWrapperTemplateInfoIds, currentLayoutWrapperTemplateInfoIds });

    previousLayoutWrappers.forEach(lw => {
      const templateInfoId = lw.templateInfo.id;
      if (currentLayoutWrapperTemplateInfoIds.indexOf(templateInfoId) < 0) {
        const el = (lw.elementRef.nativeElement as HTMLElement);
        el.classList.add('modified', 'deleted');
      }
    });

    currentLayoutWrappers.forEach(lw => {
      const templateInfoId = lw.templateInfo.id;
      const el = (lw.elementRef.nativeElement as HTMLElement);
      const previousLayoutWrapperTemplateInfoIdIndex = previousLayoutWrapperTemplateInfoIds.indexOf(templateInfoId);
      // console.log({ templateInfoId, lw, el: lw.elementRef.nativeElement, previousLayoutWrapperTemplateInfoIdIndex });
      if (previousLayoutWrapperTemplateInfoIdIndex < 0) { // 新加入的版面(不在舊的)
        el.classList.add('modified', 'added');
      } else {
        const currentLayoutWraper = lw;
        const previousLayoutWraper = previousLayoutWrappers[previousLayoutWrapperTemplateInfoIdIndex];
        // console.warn('previousLayoutWraper = ', previousLayoutWraper);
        if (JSON.stringify(previousLayoutWraper.templateInfo) === JSON.stringify(currentLayoutWraper.templateInfo)) { return; } // 版面資料沒變更
        el.classList.add('modified', 'changed');
        (previousLayoutWraper.elementRef.nativeElement as HTMLElement).classList.add('modified', 'changed');

        const previousFields = previousLayoutWraper.componentRef.instance.templateFieldDirectives;
        const currentFields = currentLayoutWraper.componentRef.instance.templateFieldDirectives;
        const previousFieldIds = previousFields.map(field => field.fieldInfo.fieldId);

        currentFields.forEach(currentField => {
          const currentFieldId = currentField.fieldInfo.fieldId;

          const hasMultipleSameFieldId = // Group 類型的版面會有複數同樣 fieldId 的欄位
            currentFields.filter(f => f.fieldInfo.fieldId === currentFieldId).length > 1
            || previousFields.filter(f => f.fieldInfo.fieldId === currentFieldId).length > 1;
          if (hasMultipleSameFieldId) { return; }

          const previousFieldIdIndex = previousFieldIds.indexOf(currentFieldId);
          if (previousFieldIdIndex < 0) { return; }
          const previousField = previousFields[previousFieldIdIndex];
          if (JSON.stringify(previousField.fieldInfo) === JSON.stringify(currentField.fieldInfo)) { return; } // 欄位資料沒變更
          (previousField.elementRef.nativeElement as HTMLElement).classList.add('field-modified');
          (currentField.elementRef.nativeElement as HTMLElement).classList.add('field-modified');
        });
      }
    });
  }

  private getFlattenLayoutWrapper(source: TemplatesContainerComponent, result: LayoutWrapperComponent[] = []) {
    source.layoutWrapperComponents.forEach(lw => {
      result.push(lw);
      (lw.componentRef?.instance?.templatesContainerComponents || []).forEach(tc => this.getFlattenLayoutWrapper(tc, result));
    });
    return result;
  }

  private closeCompare() {
    this.isComparing = false;
  }

}


