import { OnInit, Input, AfterViewInit, ViewChildren, QueryList, Injector, OnDestroy, OnChanges, SimpleChanges, Directive } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutBase } from './layout-base.interface';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { TemplateFieldDirective } from '../layout-wrapper/field-directive/template-field.directive';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { LayoutFieldTextDirective } from '../layout-wrapper/field-directive/layout-field-text.directive';
import { LayoutFieldTextareaDirective } from '../layout-wrapper/field-directive/layout-field-textarea.directive';
import { LayoutFieldLinkDirective } from '../layout-wrapper/field-directive/layout-field-link.directive';
import { LayoutFieldBgimgDirective } from '../layout-wrapper/field-directive/layout-field-bgimg.directive';
import { LayoutFieldImgDirective } from '../layout-wrapper/field-directive/layout-field-img.directive';
import { LayoutFieldHtmlEditorDirective } from '../layout-wrapper/field-directive/layout-field-html-editor.directive';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { ContentFieldInfo } from '../../../global/api/neuxAPI/bean/ContentFieldInfo';
import { ContentFieldInfoFieldType } from '../../../global/api/data-model/models/content-field-info.model';
import { PageInfoGetResponseModel } from '../../../global/api/data-model/models/page-info-get-response.model';
import { SiteInfoModel } from '../../../global/api/data-model/models/site-info.model';

@Directive()
export abstract class LayoutBaseComponent<TInfo extends ContentTemplateInfoModel>
  implements LayoutBase<TInfo>, OnInit, AfterViewInit, OnDestroy, OnChanges {

  get TEMPLATE_ID() { return this.templateId; }
  abstract templateType: TemplateType;
  abstract defaultTemplateInfo: TInfo;

  readonly FieldType = ContentFieldInfoFieldType;
  readonly TemplateType = TemplateType;

  parentLayoutWrapper: LayoutWrapperComponent;
  @ViewChildren(TemplatesContainerComponent) templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  get templateFieldDirectives(): TemplateFieldDirective[] {
    return [
      ...(this.layoutFieldTextDirectives ? Array.from(this.layoutFieldTextDirectives) : []),
      ...(this.layoutFieldTextareaDirectives ? Array.from(this.layoutFieldTextareaDirectives) : []),
      ...(this.layoutFieldLinkDirectives ? Array.from(this.layoutFieldLinkDirectives) : []),
      ...(this.layoutFieldBgimgDirectives ? Array.from(this.layoutFieldBgimgDirectives) : []),
      ...(this.layoutFieldImgDirectives ? Array.from(this.layoutFieldImgDirectives) : []),
      ...(this.layoutFieldHtmlEditorDirectives ? Array.from(this.layoutFieldHtmlEditorDirectives) : []),
    ];
  }

  @ViewChildren(LayoutFieldTextDirective) layoutFieldTextDirectives: QueryList<LayoutFieldTextDirective>;
  @ViewChildren(LayoutFieldTextareaDirective) layoutFieldTextareaDirectives: QueryList<LayoutFieldTextareaDirective>;
  @ViewChildren(LayoutFieldLinkDirective) layoutFieldLinkDirectives: QueryList<LayoutFieldLinkDirective>;
  @ViewChildren(LayoutFieldBgimgDirective) layoutFieldBgimgDirectives: QueryList<LayoutFieldBgimgDirective>;
  @ViewChildren(LayoutFieldImgDirective) layoutFieldImgDirectives: QueryList<LayoutFieldImgDirective>;
  @ViewChildren(LayoutFieldHtmlEditorDirective) layoutFieldHtmlEditorDirectives: QueryList<LayoutFieldHtmlEditorDirective>;

  @Input() mode: 'preview' | 'edit';
  @Input() fixed;
  @Input() sites: SiteInfoModel[] = [];
  @Input() pageInfo: PageInfoGetResponseModel;
  @Input() templateInfo: TInfo;

  protected destroy$ = new Subject();

  constructor(
    protected injector: Injector,
    private templateId: string,
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {
    if (this.defaultTemplateInfo) { this.defaultTemplateInfo.templateId = this.TEMPLATE_ID; }
    this.parentLayoutWrapper.checkEventBinding();
    this.parentLayoutWrapper.setInstanceData(this, true);
    merge(
      this.templatesContainerComponents.changes,
      this.layoutFieldTextDirectives.changes,
      this.layoutFieldTextareaDirectives.changes,
      this.layoutFieldLinkDirectives.changes,
      this.layoutFieldBgimgDirectives.changes,
      this.layoutFieldImgDirectives.changes,
      this.layoutFieldHtmlEditorDirectives.changes,
    ).pipe(takeUntil(this.destroy$)).subscribe(_ => {
      this.parentLayoutWrapper.checkEventBinding();
      this.parentLayoutWrapper.setInstanceData(this, true);
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