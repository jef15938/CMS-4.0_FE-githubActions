import {
  Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild,
  ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';
import {
  LayoutWrapperSelectEvent, TemplatesContainerComponent, LayoutWrapperSelectedTargetType,
  LayoutFieldTextDirective, LayoutFieldTextareaDirective, LayoutFieldLinkDirective, LayoutFieldBgimgDirective,
  LayoutFieldImgDirective, LayoutFieldHtmlEditorDirective
} from 'render';
import { ContentInfo } from './../../../../../global/api/neuxAPI/bean/ContentInfo';
import { ContentTemplateInfo } from './../../../../../global/api/neuxAPI/bean/ContentTemplateInfo';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';
import { EditorMode, ContentEditorActionMode } from '../../content-editor.interface';
import { CheckViewConfig } from './content-view-renderer.interface';

class AddTemplateBtn {
  constructor(
    public container: HTMLDivElement,
    public componentRef: ComponentRef<AddTemplateButtonComponent>,
  ) { }
}

@Component({
  selector: 'cms-content-view-renderer',
  templateUrl: './content-view-renderer.component.html',
  styleUrls: ['./content-view-renderer.component.scss']
})
export class ContentViewRendererComponent implements OnInit, AfterViewInit, OnChanges {
  EditorMode = EditorMode;

  @ViewChild(TemplatesContainerComponent) templatesContainer: TemplatesContainerComponent;

  private addTemplateBtnMap: Map<TemplatesContainerComponent, AddTemplateBtn[]> = new Map();

  @Input() editorMode: EditorMode = EditorMode.EDIT;
  @Input() editorActionMode: ContentEditorActionMode = ContentEditorActionMode.LAYOUT;
  @Input() contentInfo: ContentInfo;
  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();
  @Output() addTemplateBtnClick = new EventEmitter<AddTemplateButtonComponent>();

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.checkView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editorActionMode) {
      this.checkBtnsDisabled();
    }
  }

  private createBtnContainer() {
    const newNode = document.createElement('div');
    newNode.classList.add('cms-content-editor-add-template-btn-container');
    return newNode;
  }

  private createBtn(
    btns: AddTemplateBtn[],
    container: HTMLDivElement,
    targetArray: ContentTemplateInfo[],
    position: number,
  ) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddTemplateButtonComponent);
    const ref = componentFactory.create(this.injector, [], container);
    const instance = ref.instance;
    instance.targetArray = targetArray;
    instance.position = position;
    instance.componentRef = ref;
    instance.contextEventEmitter = this.addTemplateBtnClick;
    btns.push(new AddTemplateBtn(container, ref));
    this.applicationRef.attachView(ref.hostView);
    return ref;
  }

  private renderAddTemplateButton(templatesContainer: TemplatesContainerComponent) {
    if (this.editorMode !== EditorMode.EDIT) { return; }
    if (!templatesContainer) { return; }

    // 確認Map資料
    if (!this.addTemplateBtnMap.has(templatesContainer)) {
      this.addTemplateBtnMap.set(templatesContainer, []);
    }

    // Container Element
    const templatesContainerNativeElement: HTMLElement = templatesContainer.elementRef.nativeElement;

    // 清除既有
    const btns = this.addTemplateBtnMap.get(templatesContainer);
    btns.forEach(btn => {
      templatesContainerNativeElement.removeChild(btn.container);
    });
    btns.length = 0;

    // 產生
    templatesContainer.layoutWrapperComponents.forEach((lw, i) => {
      const btnContainer = this.createBtnContainer();
      templatesContainerNativeElement.insertBefore(btnContainer, lw.elementRef.nativeElement);
      this.createBtn(btns, btnContainer, templatesContainer.templates, i);
    });

    // 產生最後一個
    const container = this.createBtnContainer();
    templatesContainerNativeElement.appendChild(container);
    this.createBtn(btns, container, templatesContainer.templates, templatesContainer.layoutWrapperComponents.length);

    // 子節點的templatesContainer繼續產生
    templatesContainer.layoutWrapperComponents.forEach(lw => {
      return lw?.componentRef?.instance?.templatesContainerComponents?.map(t => this.renderAddTemplateButton(t))
        || undefined;
    });
  }

  private renderViewInfo(templatesContainer: TemplatesContainerComponent) {
    if (!templatesContainer) { return; }

    templatesContainer.layoutWrapperComponents?.forEach((lw) => {
      if (this.editorMode !== EditorMode.INFO) { // EDIT or READ
        (lw?.elementRef?.nativeElement as HTMLElement)?.setAttribute('hover-info', `版型ID:${lw.templateInfo.templateId}`);
      }

      lw?.componentRef?.instance?.templateFieldDirectives?.forEach(field => {
        if (this.editorMode !== EditorMode.INFO) { // EDIT or READ
          (field?.elementRef?.nativeElement as HTMLElement)?.setAttribute('hover-info', `${field.fieldInfo.fieldType}`);
        } else {
          (field?.elementRef?.nativeElement as HTMLElement)?.classList.add('edit-info');
          const infos: string[] = [];
          if (field instanceof LayoutFieldTextDirective) {
            infos.push(field.maxLength > 1 ? `字數限制:${field.maxLength}` : '無字數限制');
          }
          if (field instanceof LayoutFieldTextareaDirective) {
            infos.push(field.maxLength > 1 ? `字數限制:${field.maxLength}` : '無字數限制');
            infos.push(field.maxLines > 1 ? `行數限制:${field.maxLines}` : '無行數限制');
          }
          if (field instanceof LayoutFieldLinkDirective) {

          }
          if (field instanceof LayoutFieldBgimgDirective) {
            infos.push(`建議尺寸:${field.adviceWidth}x${field.adviceHeight}`);
            infos.push(`建議格式:${field.adviceFormat}`);
          }
          if (field instanceof LayoutFieldImgDirective) {
            infos.push(`建議尺寸:${field.adviceWidth}x${field.adviceHeight}`);
            infos.push(`建議格式:${field.adviceFormat}`);
          }
          if (field instanceof LayoutFieldHtmlEditorDirective) {

          }
          const info = infos.length ? infos.join('; ') : '';
          (field?.elementRef?.nativeElement as HTMLElement)?.setAttribute('edit-info', `${field.fieldInfo.fieldType}${info ? ' : ' : ''}${info}`);
        }
      });
    });

    return templatesContainer?.layoutWrapperComponents?.map(
      lw => lw.componentRef?.instance?.templatesContainerComponents?.map(t => this.renderViewInfo(t))
    );
  }

  private checkBtnsDisabled() {
    const actionMode = this.editorActionMode;
    this.addTemplateBtnMap?.forEach(btns => {
      btns?.forEach(btn => {
        switch (actionMode) {
          case ContentEditorActionMode.LAYOUT:
            btn.componentRef.instance.disabled = false;
            break;
          case ContentEditorActionMode.TEMPLATE:
            btn.componentRef.instance.disabled = true;
            break;
        }
      });
    });
  }

  checkView(config?: CheckViewConfig) {
    this.changeDetectorRef.detectChanges();
    // TODO: 優化，有無可以不用setTimeout的方法
    setTimeout(() => {
      this.renderAddTemplateButton(this.templatesContainer);
      this.checkBtnsDisabled();
      this.renderViewInfo(this.templatesContainer);
      if (config?.select) {
        const select = config.select;
        const event: LayoutWrapperSelectEvent = {
          selectedTarget: select.elementRef.nativeElement,
          selectedTargetType: LayoutWrapperSelectedTargetType.TEMPLATE,
          wrapper: select,
          componentRef: select.componentRef,
          templateType: select.componentRef.instance.templateType,
          templateInfo: select.componentRef.instance.templateInfo,
        };
        this.select.emit(event);
      }
    }, 0);
  }

  onSelect(ev: LayoutWrapperSelectEvent) {
    if (this.editorMode !== EditorMode.EDIT) { return; }
    if (
      this.editorActionMode === ContentEditorActionMode.LAYOUT
      && ev.selectedTargetType === LayoutWrapperSelectedTargetType.FIELD
    ) { return; }

    this.select.emit(ev);
  }

  onEnter(target: HTMLElement) {
    if (this.editorMode !== EditorMode.EDIT) { return; }
    // if (this.editorActionMode === ContentEditorActionMode.LAYOUT) { return; }
    target.classList.add('now-hover');
  }

  onLeave(target: HTMLElement) {
    if (this.editorMode !== EditorMode.EDIT) { return; }
    // if (this.editorActionMode === ContentEditorActionMode.LAYOUT) { return; }
    target.classList.remove('now-hover');
  }

}
