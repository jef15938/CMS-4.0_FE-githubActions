import {
  Component, OnInit, Input, Output, EventEmitter, AfterViewInit,
  ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, ChangeDetectorRef, ViewChildren, QueryList
} from '@angular/core';
import {
  LayoutWrapperSelectEvent, TemplatesContainerComponent, LayoutWrapperSelectedTargetType,
  LayoutFieldTextDirective, LayoutFieldTextareaDirective, LayoutFieldLinkDirective, LayoutFieldBgimgDirective,
  LayoutFieldImgDirective, LayoutFieldHtmlEditorDirective, LayoutWrapperComponent, FixedWrapperComponent
} from '@neux/render';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';
import { EditorMode } from '../../content-editor.interface';
import { CheckViewConfig } from './content-view-renderer.interface';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ContentInfoModel } from '../../../../../global/api/data-model/models/content-info.model';

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
export class ContentViewRendererComponent implements OnInit, AfterViewInit {
  EditorMode = EditorMode;

  // @ViewChild(TemplatesContainerComponent) templatesContainer: TemplatesContainerComponent;
  @ViewChildren(TemplatesContainerComponent) templatesContainers: QueryList<TemplatesContainerComponent>;

  private addTemplateBtnMap: Map<TemplatesContainerComponent, AddTemplateBtn[]> = new Map();

  @Input() editorMode: EditorMode = EditorMode.EDIT;
  @Input() contentInfo: ContentInfoModel;
  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();
  @Output() addTemplateBtnClick = new EventEmitter<AddTemplateButtonComponent>();

  tabIndex = 0;

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

  /** 插入 加入版塊按紐 */
  private createBtnContainer() {
    const newNode = document.createElement('div');
    newNode.classList.add('cms-content-editor-add-template-btn-container');
    return newNode;
  }

  private createBtn(
    btns: AddTemplateBtn[],
    container: HTMLDivElement,
    position: number,
    targetLayoutWrapper: LayoutWrapperComponent,
    templatesContainer: TemplatesContainerComponent,
    rootTemplatesContainer: TemplatesContainerComponent,
  ) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddTemplateButtonComponent);
    const ref = componentFactory.create(this.injector, [], container);
    const instance = ref.instance;
    instance.position = position;
    instance.componentRef = ref;
    instance.targetLayoutWrapper = targetLayoutWrapper;
    instance.templatesContainer = templatesContainer;
    instance.rootTemplatesContainer = rootTemplatesContainer;
    instance.contextEventEmitter = this.addTemplateBtnClick;
    btns.push(new AddTemplateBtn(container, ref));
    this.applicationRef.attachView(ref.hostView);
    return ref;
  }

  private renderAddTemplateButton(templatesContainer: TemplatesContainerComponent, rootTemplatesContainer: TemplatesContainerComponent) {
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

    if ( // 如果有固定式版面，跳過
      !Array.from(templatesContainer.layoutWrapperComponents || [])
        .some(lw => lw.componentRef?.instance instanceof FixedWrapperComponent)
    ) {
      // 產生
      templatesContainer.layoutWrapperComponents.forEach((lw, i) => {
        const btnContainer = this.createBtnContainer();
        templatesContainerNativeElement.insertBefore(btnContainer, lw.elementRef.nativeElement);
        this.createBtn(btns, btnContainer, i, lw, templatesContainer, rootTemplatesContainer);
      });

      // 產生最後一個
      const container = this.createBtnContainer();
      templatesContainerNativeElement.appendChild(container);
      this.createBtn(btns, container, templatesContainer.layoutWrapperComponents.length, null, templatesContainer, rootTemplatesContainer);
    }

    // 子節點的templatesContainer繼續產生
    templatesContainer.layoutWrapperComponents.forEach(lw => {
      let children: TemplatesContainerComponent[] = Array.from(lw.componentRef?.instance.templatesContainerComponents || []);

      if (lw.dynamicWrapperComponent.componentRef?.instance instanceof FixedWrapperComponent) {
        children = children.map(childTemplatesContainer =>
          Array.from(childTemplatesContainer.layoutWrapperComponents || [])
            .reduce((a, b) => a.concat(b), [] as LayoutWrapperComponent[])
            .map(childLayoutWrapper => Array.from(childLayoutWrapper.componentRef.instance.templatesContainerComponents || []))
            .reduce((a, b) => a.concat(b), [] as TemplatesContainerComponent[])
        ).reduce((a, b) => a.concat(b), [] as TemplatesContainerComponent[]);
      }

      return children.map(t => this.renderAddTemplateButton(t, rootTemplatesContainer))
        || undefined;
    });
  }

  private renderViewInfo(templatesContainer: TemplatesContainerComponent) {
    if (!templatesContainer) { return; }

    templatesContainer.layoutWrapperComponents?.forEach((lw) => {
      if (!lw.componentRef?.instance) { return; }
      if (this.editorMode !== EditorMode.INFO) { // EDIT or READ
        if (!(lw.componentRef.instance instanceof FixedWrapperComponent)) {
          (lw?.elementRef?.nativeElement as HTMLElement)?.setAttribute('hover-info', `版型ID:${lw.templateInfo.templateId}`);
        }
      }

      lw?.componentRef?.instance?.templateFieldDirectives?.forEach(field => {
        const element = field?.elementRef?.nativeElement as HTMLElement;
        if (this.editorMode !== EditorMode.INFO) { // EDIT or READ
          element?.setAttribute('hover-info', `${field?.fieldInfo?.fieldType || ''}`);
        } else {
          element?.classList.add('edit-info');
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
          element?.setAttribute('edit-info', `${field.fieldInfo.fieldType}${info ? ' : ' : ''}${info}`);
        }
      });
    });

    return templatesContainer?.layoutWrapperComponents?.map(
      lw => lw.componentRef?.instance?.templatesContainerComponents?.map(t => this.renderViewInfo(t))
    );
  }

  checkView(config?: CheckViewConfig) {
    this.changeDetectorRef.detectChanges();
    // TODO: 優化，有無可以不用setTimeout的方法
    setTimeout(() => {
      // console.warn('this.templatesContainer = ', this.templatesContainer);
      Array.from(this.templatesContainers).forEach(templatesContainer => {
        this.renderAddTemplateButton(templatesContainer, templatesContainer);
        this.renderViewInfo(templatesContainer);
      });
      // this.renderAddTemplateButton(this.templatesContainer);
      // this.renderViewInfo(this.templatesContainer);
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
    this.select.emit(ev);
  }

  onEnter(target: HTMLElement) {
    if (this.editorMode !== EditorMode.EDIT) { return; }
    target.classList.add('now-hover');
  }

  onLeave(target: HTMLElement) {
    if (this.editorMode !== EditorMode.EDIT) { return; }
    target.classList.remove('now-hover');
  }

  onSelectedTabChange(ev: MatTabChangeEvent) {
    this.tabIndex = ev.index;
    setTimeout(_ => this.checkView(), 0);
  }

}
