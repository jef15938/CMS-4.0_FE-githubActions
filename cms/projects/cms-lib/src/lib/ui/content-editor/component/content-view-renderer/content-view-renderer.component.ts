import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild, ComponentFactoryResolver, Injector, ApplicationRef, ComponentRef, ChangeDetectorRef } from '@angular/core';
import { ContentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentInfo';
import { LayoutWrapperSelectEvent, TemplatesContainerComponent } from 'layout';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';
import { ContentTemplateInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentTemplateInfo';

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

  @ViewChild(TemplatesContainerComponent) templatesContainer: TemplatesContainerComponent;

  private _nowSelectedTarget: HTMLElement;

  private _addTemplateBtnMap: Map<TemplatesContainerComponent, AddTemplateBtn[]> = new Map();

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

  checkView(){
    this._changeDetectorRef.detectChanges();
    this._renderAddTemplateButton(this.templatesContainer);
  }

  onSelect(ev: LayoutWrapperSelectEvent) {
    const oldSelectedTarget = this._nowSelectedTarget;
    if (oldSelectedTarget) { oldSelectedTarget.classList.remove('now-edit'); }

    const newSelectedTarget = ev.selectedTarget;
    if (newSelectedTarget) { newSelectedTarget.classList.add('now-edit'); }

    this._nowSelectedTarget = newSelectedTarget;

    this.select.next(ev);
  }

  onEnter(target: HTMLElement) {
    target.classList.add('now-hover');
  }

  onLeave(target: HTMLElement) {
    target.classList.remove('now-hover');
  }

}
