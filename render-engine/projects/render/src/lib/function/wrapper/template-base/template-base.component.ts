import { OnInit, Input, AfterViewInit, ViewChildren, QueryList, Injector, OnDestroy, OnChanges, SimpleChanges, Directive } from '@angular/core';
import { Subject, merge, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { TemplateComponent } from './template-base.interface';
import { TemplateWrapperComponent } from '../template-wrapper/template-wrapper.component';
import { TemplateType } from '../template-wrapper/template-wrapper.interface';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { ContentFieldInfo } from '../../../global/api/neuxAPI/bean/ContentFieldInfo';
import { ContentFieldInfoFieldType } from '../../../global/api/data-model/models/content-field-info.model';
// Field
import { TemplateFieldDirective } from '../template-field/template-field.directive';
import { TemplateFieldTextDirective } from '../template-field/template-field-text.directive';
import { TemplateFieldTextareaDirective } from '../template-field/template-field-textarea.directive';
import { TemplateFieldLinkDirective } from '../template-field/template-field-link.directive';
import { TemplateFieldBgimgDirective } from '../template-field/template-field-bgimg.directive';
import { TemplateFieldImgDirective } from '../template-field/template-field-img.directive';
import { TemplateFieldHtmlEditorDirective } from '../template-field/template-field-html-editor.directive';
// state
import { RenderPageStore, RenderPageState } from '../../../global/component-store/render-page.store';
@Directive()
export abstract class TemplateBaseComponent<TInfo extends ContentTemplateInfoModel>
  implements TemplateComponent<TInfo>, OnInit, AfterViewInit, OnDestroy, OnChanges {

  get TEMPLATE_ID() { return this.templateId; }
  abstract templateType: TemplateType;
  abstract defaultTemplateInfo: TInfo;

  readonly FieldType = ContentFieldInfoFieldType;
  readonly TemplateType = TemplateType;

  parentTemplateWrapper: TemplateWrapperComponent;
  @ViewChildren(TemplatesContainerComponent) templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  get templateFieldDirectives(): TemplateFieldDirective[] {
    return [
      ...(this.templateFieldTextDirectives ? Array.from(this.templateFieldTextDirectives) : []),
      ...(this.templateFieldTextareaDirectives ? Array.from(this.templateFieldTextareaDirectives) : []),
      ...(this.templateFieldLinkDirectives ? Array.from(this.templateFieldLinkDirectives) : []),
      ...(this.templateFieldBgimgDirectives ? Array.from(this.templateFieldBgimgDirectives) : []),
      ...(this.templateFieldImgDirectives ? Array.from(this.templateFieldImgDirectives) : []),
      ...(this.templateFieldHtmlEditorDirectives ? Array.from(this.templateFieldHtmlEditorDirectives) : []),
    ];
  }

  @ViewChildren(TemplateFieldTextDirective) templateFieldTextDirectives: QueryList<TemplateFieldTextDirective>;
  @ViewChildren(TemplateFieldTextareaDirective) templateFieldTextareaDirectives: QueryList<TemplateFieldTextareaDirective>;
  @ViewChildren(TemplateFieldLinkDirective) templateFieldLinkDirectives: QueryList<TemplateFieldLinkDirective>;
  @ViewChildren(TemplateFieldBgimgDirective) templateFieldBgimgDirectives: QueryList<TemplateFieldBgimgDirective>;
  @ViewChildren(TemplateFieldImgDirective) templateFieldImgDirectives: QueryList<TemplateFieldImgDirective>;
  @ViewChildren(TemplateFieldHtmlEditorDirective) templateFieldHtmlEditorDirectives: QueryList<TemplateFieldHtmlEditorDirective>;

  @Input() fixed;
  @Input() templateInfo: TInfo;

  protected destroy$ = new Subject();

  protected renderPageStore: RenderPageStore;
  public renderPageState$: Observable<RenderPageState>;
  public renderPageState: RenderPageState;

  constructor(
    protected injector: Injector,
    private templateId: string,
  ) {
    this.renderPageStore = injector.get(RenderPageStore);
    this.renderPageState$ = this.renderPageStore.renderState$.pipe(
      takeUntil(this.destroy$),
      tap(state => this.renderPageState = state),
    );
    this.renderPageState$.subscribe();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {
    if (this.defaultTemplateInfo) { this.defaultTemplateInfo.templateId = this.TEMPLATE_ID; }
    this.parentTemplateWrapper.checkEventBinding();
    this.parentTemplateWrapper.setInstanceData(this, true);
    merge(
      this.templatesContainerComponents.changes,
      this.templateFieldTextDirectives.changes,
      this.templateFieldTextareaDirectives.changes,
      this.templateFieldLinkDirectives.changes,
      this.templateFieldBgimgDirectives.changes,
      this.templateFieldImgDirectives.changes,
      this.templateFieldHtmlEditorDirectives.changes,
    ).pipe(takeUntil(this.destroy$)).subscribe(_ => {
      this.parentTemplateWrapper.checkEventBinding();
      this.parentTemplateWrapper.setInstanceData(this, true);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  /**
   *
   *
   * fieldId
   * [fields] 不給的話從 this.templateInfo.fields 找
   */
  getFieldByFieldId(fieldId: string, fields?: ContentFieldInfo[]): ContentFieldInfo {
    fields = fields || this.templateInfo?.fields || [];
    return fields.find(f => f.fieldId === fieldId);
  }

}
