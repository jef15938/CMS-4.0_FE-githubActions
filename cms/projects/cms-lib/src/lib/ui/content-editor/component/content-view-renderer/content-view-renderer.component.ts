import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { ContentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentInfo';
import { LayoutWrapperSelectEvent, TemplatesContainerComponent, LayoutWrapperComponent, LayoutWrapperSelectedTargetType } from 'layout';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';
import { ContentTemplateInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentTemplateInfo';
import { EditorMode } from '../../content-editor.interface';

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

  @ViewChild(TemplatesContainerComponent) templatesContainer: TemplatesContainerComponent;

  private _nowSelectedTarget: HTMLElement;

  private _addTemplateBtnMap: Map<TemplatesContainerComponent, AddTemplateBtn[]> = new Map();

  @Input() mode: EditorMode = EditorMode.EDIT;
  @Input() contentInfo: ContentInfo;
  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();
  @Output() addTemplateBtnClick = new EventEmitter<AddTemplateButtonComponent>();

  constructor(
    private _injector: Injector,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _applicationRef: ApplicationRef,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.checkView();
  }

  private _createBtnContainer() {
    const newNode = document.createElement('div');
    newNode.classList.add('cms-content-editor-add-template-btn-container');
    return newNode;
  }

  private _createBtn(
    btns: AddTemplateBtn[],
    container: HTMLDivElement,
    targetArray: ContentTemplateInfo[],
    position: number,
  ) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(AddTemplateButtonComponent);
    const ref = componentFactory.create(this._injector, [], container);
    const instance = ref.instance;
    instance.targetArray = targetArray;
    instance.position = position;
    instance.componentRef = ref;
    instance.contextEventEmitter = this.addTemplateBtnClick;
    btns.push(new AddTemplateBtn(container, ref));
    this._applicationRef.attachView(ref.hostView);
    return ref;
  }

  private _renderAddTemplateButton(templatesContainer: TemplatesContainerComponent) {
    if (this.mode !== EditorMode.EDIT) { return; }
    if (!templatesContainer) { return; }

    // 確認Map資料
    if (!this._addTemplateBtnMap.has(templatesContainer)) {
      this._addTemplateBtnMap.set(templatesContainer, []);
    }

    // Container Element
    const templatesContainerNativeElement: HTMLElement = templatesContainer.elementRef.nativeElement;

    // 清除既有
    const btns = this._addTemplateBtnMap.get(templatesContainer);
    btns.forEach(btn => {
      templatesContainerNativeElement.removeChild(btn.container);
    });
    btns.length = 0;

    // 產生
    templatesContainer.layoutWrapperComponents.forEach((lw, i) => {
      const container = this._createBtnContainer();
      templatesContainerNativeElement.insertBefore(container, lw.elementRef.nativeElement);
      this._createBtn(btns, container, templatesContainer.templates, i);
    });

    // 產生最後一個
    const container = this._createBtnContainer();
    templatesContainerNativeElement.appendChild(container);
    this._createBtn(btns, container, templatesContainer.templates, templatesContainer.layoutWrapperComponents.length);

    // 子節點的templatesContainer繼續產生
    templatesContainer.layoutWrapperComponents.forEach(lw => {
      return lw.componentRef.instance.templatesContainerComponents
        ? lw.componentRef.instance.templatesContainerComponents.map(t => this._renderAddTemplateButton(t))
        : undefined;
    });
  }

  private _renderViewInfo(templatesContainer: TemplatesContainerComponent) {
    if (!templatesContainer) { return; }

    templatesContainer.layoutWrapperComponents?.forEach((lw) => {
      if (this.mode !== EditorMode.INFO) { // EDIT or READ
        (lw?.elementRef?.nativeElement as HTMLElement)?.setAttribute('hover-info', `版型ID:${lw.templateInfo.templateId}`);
      }

      lw?.componentRef?.instance?.templateFieldDirectives?.forEach(field => {
        if (this.mode !== EditorMode.INFO) { // EDIT or READ
          (field?.elementRef?.nativeElement as HTMLElement)?.setAttribute('hover-info', `${field.fieldInfo.fieldType}`);
        } else {
          (field?.elementRef?.nativeElement as HTMLElement)?.classList.add('edit-info');
          (field?.elementRef?.nativeElement as HTMLElement)?.setAttribute('edit-info', `${field.fieldInfo.fieldType}:${field.fieldInfo.fieldId}`);
        }
      })
    });

    return templatesContainer?.layoutWrapperComponents?.map(lw => lw.componentRef?.instance?.templatesContainerComponents?.map(t => this._renderViewInfo(t)));
  }

  checkView(config?: { select: LayoutWrapperComponent }) {
    this._changeDetectorRef.detectChanges();
    // TODO: 優化，有無可以不用setTimeout的方法
    setTimeout(() => {
      this._renderAddTemplateButton(this.templatesContainer);
      this._renderViewInfo(this.templatesContainer);
      if (config?.select) {
        const select = config.select
        const event: LayoutWrapperSelectEvent = {
          selectedTarget: select.elementRef.nativeElement,
          selectedTargetType: LayoutWrapperSelectedTargetType.TEMPLATE,
          wrapper: select,
          componentRef: select.componentRef,
          templateType: select.componentRef.instance.templateType,
          templateInfo: select.componentRef.instance.templateInfo,
        }
        this.select.emit(event);
      }
    }, 0)
  }

  onSelect(ev: LayoutWrapperSelectEvent) {
    const oldSelectedTarget = this._nowSelectedTarget;
    if (oldSelectedTarget) { oldSelectedTarget.classList.remove('now-edit'); }

    const newSelectedTarget = ev.selectedTarget;
    if (newSelectedTarget) { newSelectedTarget.classList.add('now-edit'); }

    this._nowSelectedTarget = newSelectedTarget;

    this.select.emit(ev);
  }

  onEnter(target: HTMLElement) {
    if (this.mode === EditorMode.INFO) { return; }
    target.classList.add('now-hover');
  }

  onLeave(target: HTMLElement) {
    if (this.mode === EditorMode.INFO) { return; }
    target.classList.remove('now-hover');
  }

}
