import {
  Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild,
  AfterContentChecked, ChangeDetectorRef, ElementRef, AfterViewInit, ViewChildren, QueryList, HostListener, Inject
} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { ContentEditorSaveEvent, EditorMode, ContentEditorActionMode, ContentEditorContext } from './content-editor.interface';
import { ContentEditorManager } from './service/content-editor-manager';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { ContentViewRendererComponent } from './component/content-view-renderer/content-view-renderer.component';
import { CmsCanDeactiveGuardian } from '../../../global/interface/cms-candeactive-guardian.interface';
import { CmsCanDeactiveGuard } from '../../../global/service/cms-candeactive-guard';
import { TabTemplateInfo, TemplatesContainerComponent, LayoutWrapperComponent } from '@neux/render';
import { ModalService } from '../modal';
import { ContentVersionRecoverModalComponent } from './component/content-version-recover-modal/content-version-recover-modal.component';
import { ContentService } from '../../../global/api/service';
import { ContentVersionInfo } from '../../../global/api/neuxAPI/bean/ContentVersionInfo';
import { ATTRIBUTE_GALLERY_ID } from '../html-editor/const/html-editor-container.const';
import { CMS_ENVIROMENT_TOKEN } from '../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../global/interface';
import { TemplateGetResponseModel } from '../../../global/api/data-model/models/template-get-response.model';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';
import { ContentFieldInfoFieldType } from '../../../global/api/data-model/models/content-field-info.model';
import { ContentInfoModel } from '../../../global/api/data-model/models/content-info.model';
import { ContentBlockInfoModel } from '../../../global/api/data-model/models/content-block-info.model';

const isTabTemplateInfo = (templateInfo: ContentTemplateInfoModel): boolean => {
  return !!(templateInfo as any).tabList;
};

@Component({
  selector: 'cms-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked,
  CmsCanDeactiveGuardian, ContentEditorContext {
  EditorMode = EditorMode;
  ContentEditorActionMode = ContentEditorActionMode;

  @ViewChild(ContentViewRendererComponent) contentViewRenderer: ContentViewRendererComponent;
  @ViewChild(LayoutControlPanelComponent) layoutControlPanel: LayoutControlPanelComponent;
  @ViewChild(ContentControlPanelComponent) contentControlPanel: ContentControlPanelComponent;

  @ViewChildren('clickCapturelistenerBlock') clickCapturelistenerBlocks: QueryList<ElementRef>;

  // 使用模式
  @Input() editorMode: EditorMode = EditorMode.EDIT;
  editorActionMode: ContentEditorActionMode = ContentEditorActionMode.LAYOUT;

  // 編輯對象外部提供資料
  @Input() contentInfo: ContentInfoModel;
  @Input() contentID: string;

  // 可選版面資料
  @Input() selectableTemplates: TemplateGetResponseModel;

  @Input() btnClose = true;

  @Output() editorClose = new EventEmitter<ContentInfoModel>();
  @Output() editorSave = new EventEmitter<ContentEditorSaveEvent>();

  manager: ContentEditorManager;

  saved = true;
  isScaleContent = false;

  destroy$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private cmsCanDeactiveGuard: CmsCanDeactiveGuard,
    private modalService: ModalService,
    private contentService: ContentService,
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
  ) {

  }

  ngOnInit(): void {
    const contentInfo: ContentInfoModel = this.convertToEditorContent(this.contentInfo);
    this.cmsCanDeactiveGuard.registerAsGuardian(this);
    this.resetSelected();
    this.manager = new ContentEditorManager(contentInfo);
  }

  ngAfterViewInit(): void {
    this.registerClickCaptureListener('register');
    this.manager.stateManager.stateChange.subscribe(_ => {
      this.setEditorUnsaved();
      this.contentViewRenderer.checkView();
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    this.registerClickCaptureListener('unregister');
  }

  private convertToEditorContent(contentInfo: ContentInfoModel): ContentInfoModel {
    const info = JSON.parse(JSON.stringify(contentInfo)) as ContentInfoModel;
    info.languages.forEach(lang => {
      let templates = lang.blocks.map(b => b.templates).reduce((a, b) => a.concat(b), [] as ContentTemplateInfoModel[]);
      while (templates?.length) {
        let tempTemplates: ContentTemplateInfoModel[] = [];
        templates.forEach(template => {
          template.fields.forEach(field => {
            if (field.fieldType === ContentFieldInfoFieldType.HTMLEDITOR) {
              const htmlString = field.fieldVal;
              const container = document.createElement('div');
              container.innerHTML = htmlString;
              const imgs = Array.from(container.querySelectorAll('img'));
              imgs.forEach(img => {
                const galleryID = img.getAttribute(ATTRIBUTE_GALLERY_ID);
                if (galleryID) {
                  const src = img.getAttribute('src');
                  if (src.indexOf(this.environment.apiBaseUrl) < 0) {
                    img.setAttribute('src', `${this.environment.apiBaseUrl}${src}`);
                  }
                }
              });
              field.fieldVal = container.innerHTML;
            }
          });
          if (isTabTemplateInfo(template)) {
            tempTemplates = tempTemplates.concat(((template as any) as TabTemplateInfo).tabList.reduce((a, b) => a.concat(b.children), []));
          }
        });
        templates = tempTemplates;
      }
    });
    return info;
  }

  private convertEditorContentToData(contentInfo: ContentInfoModel): ContentInfoModel {
    const info = JSON.parse(JSON.stringify(contentInfo)) as ContentInfoModel;
    info.languages.forEach(lang => {
      let templates = lang.blocks.map(b => b.templates).reduce((a, b) => a.concat(b), [] as ContentTemplateInfoModel[]);
      while (templates?.length) {
        let tempTemplates: ContentTemplateInfoModel[] = [];
        templates.forEach(template => {
          template.fields.forEach(field => {
            if (field.fieldType === ContentFieldInfoFieldType.HTMLEDITOR) {
              const htmlString = field.fieldVal;
              const container = document.createElement('div');
              container.innerHTML = htmlString;
              const imgs = Array.from(container.querySelectorAll('img'));
              imgs.forEach(img => {
                const galleryID = img.getAttribute(ATTRIBUTE_GALLERY_ID);
                if (galleryID) {
                  const src = img.getAttribute('src');
                  if (src.indexOf(this.environment.apiBaseUrl) > -1) {
                    img.setAttribute('src', `${src.replace(this.environment.apiBaseUrl, '')}`);
                  }
                }
              });
              field.fieldVal = container.innerHTML;
            }
          });
          if (isTabTemplateInfo(template)) {
            tempTemplates = tempTemplates.concat(((template as any) as TabTemplateInfo).tabList.reduce((a, b) => a.concat(b.children), []));
          }
        });
        templates = tempTemplates;
      }
    });
    return info;
  }

  setEditorUnsaved() {
    this.saved = false;
  }

  setEditorSaved() {
    this.saved = true;
  }

  clear() {
    const yes = window.confirm('確定清空此頁面？');
    if (yes) {
      this.manager.stateManager.currentState.snapShot.languages.forEach(language => {
        language.blocks.forEach(b => b.templates.length = 0);
      });
      this.manager.stateManager.preserveState('清空內容');
    }
  }

  private getCurrentContent() {
    const contentInfo: ContentInfoModel = this.convertEditorContentToData(
      JSON.parse(JSON.stringify(this.manager.stateManager.contentInfoEditModel))
    );
    let galleryIds: string[] = [];

    let templates: ContentTemplateInfoModel[] = contentInfo.languages
      .reduce((a, b) => a.concat(b.blocks || []), [] as ContentBlockInfoModel[])
      .map(block => block.templates)
      .reduce((a, b) => a.concat(b || []), [] as ContentTemplateInfoModel[]);

    // 循環檢查 TemplateInfo 內是否用到 gallery 檔案，找出 galleryID
    while (templates.length) {
      let children: ContentTemplateInfoModel[] = [];

      templates.forEach(template => {
        template.fields.forEach(field => {
          switch (field.fieldType) {
            case ContentFieldInfoFieldType.HTMLEDITOR:
              const htmlString = field.fieldVal || '';
              const galleryIdRegex = new RegExp(/gallery-id="([^"]|\\")*"/, 'g');
              const matches = htmlString.match(galleryIdRegex);
              const ids = matches?.map(str => str.replace('gallery-id="', '').replace('"', '')) || [];
              galleryIds = [...galleryIds, ...ids];
              break;
            case ContentFieldInfoFieldType.IMG:
              const imgGalleryID = field.extension['gallery-id'];
              if (imgGalleryID) {
                galleryIds.push(imgGalleryID);
              }
              break;
            case ContentFieldInfoFieldType.BGIMG:
              const bgimgGalleryID = field.extension['gallery-id'];
              if (bgimgGalleryID) {
                galleryIds.push(bgimgGalleryID);
              }
              break;
          }
        });

        if (isTabTemplateInfo(template)) {
          children = [
            ...children,
            ...((template as any) as TabTemplateInfo).tabList
              .reduce<ContentTemplateInfoModel[]>((a, b) => [...a, ...(b.children as any[])], [])
          ];
        }
      });

      templates = children;
    }

    contentInfo.galleries = [...new Set(galleryIds)].sort();

    return contentInfo;
  }

  close() {
    const contentInfo = this.getCurrentContent();
    if (!this.contentID) {
      this.editorClose.emit(contentInfo);
      return;
    }

    if (!this.saved || this.contentControlPanel?.hasChange) {
      const yes = window.confirm('有尚未儲存的變更，確定關閉？');
      if (!yes) { return; }
    }
    this.editorClose.emit(contentInfo);
  }

  save() {
    const contentInfo = this.getCurrentContent();
    this.editorSave.emit({
      contentInfo,
      editorSave: this.setEditorSaved.bind(this),
    });
  }

  cancelScale() {
    this.isScaleContent = false;
  }

  resetSelected() {
    if (this.manager) {
      this.manager.selectedTemplateAddBtn = undefined;
      this.manager.selectedViewElementEvent = undefined;
    }
  }

  /**
   * // TODO: 待檢討或優化．
   * 處理"選取Template/Field，與拷貝物件保存功能衝突"造成的問題．
   * 利用監聽Capture讓程式能在 "按下" -> "選取Template/Field" 中間階段做事．
   * ps 1. Angular Dom Event Binding Or fromEvent() 無法監聽 Capture 階段 ?
   * ps 2. 在listener的function內呼叫ev.stopPropagation()，會讓Click不往下傳給child，造成無法選取．
   *
   * 選取Template/Field後，會將對應元件的資料物件傳回給 ContentControlPanel 做編輯．
   * 與拷貝物件保存功能會造成衝突：
   * 1.選取的是舊物件，在 ContentControlPanel 編輯時不會同步反映到 ContentViewRenderer 的畫面上．
   * 2.在 ContentControlPanel 編輯後，物件拷貝更新了，但是無法觸發畫面重新渲染，造成 ContentViewRenderer 產生 AddTemplateBtn 時異常．
   *
   */
  private registerClickCaptureListener(action: 'register' | 'unregister') {
    this.clickCapturelistenerBlocks?.forEach(block => {
      const element = block?.nativeElement as HTMLDivElement;
      switch (action) {
        case 'register':
          element?.addEventListener('click', this.clickCaptureEventListener, true);
          break;
        case 'unregister':
          element?.removeEventListener('click', this.clickCaptureEventListener, true);
          break;
      }
    });
  }

  clickCaptureEventListener = (ev) => {
    if (this.contentControlPanel?.hasChange) {
      const yes = window.confirm('選取的Template/Field有尚未儲存的變更，確定放棄？');
      if (!yes) { ev.stopPropagation(); return; }
      this.resetSelected();
      this.contentControlPanel.hasChange = false;
      this.manager.stateManager.resetState();
      this.contentViewRenderer.checkView();
      this.cancelScale();
    } else {
      this.resetSelected();
      this.cancelScale();
    }
  }

  onViewSelected($event) {
    if (this.editorMode !== EditorMode.EDIT) { return; }
    this.resetSelected();
    this.manager.selectedViewElementEvent = $event;
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (!this.saved) {
      alert('有尚未儲存的內容');
      return false;
    }
    this.close();
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunload(e): boolean {
    if (!this.saved) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = '';
      return false;
    }
    return true;
  }

  openVersionRecoverModal() {
    this.modalService.openComponent({
      component: ContentVersionRecoverModalComponent,
      componentInitData: {
        contentID: this.contentID,
      }
    }).subscribe((version: ContentVersionInfo) => {
      if (version) {
        this.contentService.getContentById(this.contentID, version.version).subscribe(contentInfo => {
          this.manager.stateManager.currentState.snapShot = contentInfo;
          this.manager.stateManager.preserveState(`復原版本 ${version.version}`);
        });
      }
    });
  }

  getRootTemplatesContainerComponents() {
    return Array.from(this.contentViewRenderer.templatesContainers);
  }

  findLayoutWrapperByTemplateInfoId(
    templateInfoId: string,
    source: TemplatesContainerComponent
  ): LayoutWrapperComponent {
    if (!templateInfoId || !source) { return null; }
    const layoutWrappers = Array.from(source.layoutWrapperComponents || []);
    const target = layoutWrappers.find(lw => lw.templateInfo.id === templateInfoId);
    if (target) { return target; }
    return layoutWrappers.map(lw => Array.from(lw.componentRef.instance.templatesContainerComponents || []))
      .reduce((a, b) => a.concat(b), [] as TemplatesContainerComponent[])
      .map(templatesContainer => this.findLayoutWrapperByTemplateInfoId(templateInfoId, templatesContainer))
      .find(v => !!v);
  }

  findParentLayoutWrapperOfTemplatesContainer(
    templatesContainer: TemplatesContainerComponent,
    source: TemplatesContainerComponent,
    parent?: LayoutWrapperComponent,
  ): LayoutWrapperComponent {
    if (!templatesContainer || !source) { return null; }
    if (templatesContainer === source) { return parent; }

    let target: LayoutWrapperComponent;
    const childLayoutWrappers = Array.from(source.layoutWrapperComponents || []);
    childLayoutWrappers.forEach(childLayoutWrapper => {
      const childTemplatesContainerComponents = Array.from(childLayoutWrapper.componentRef.instance.templatesContainerComponents || []);
      if (childTemplatesContainerComponents.indexOf(templatesContainer) > -1) {
        target = childLayoutWrapper;
      }
    });
    if (target) { return target; }

    const grandsonLayoutWrappers = childLayoutWrappers
      .map(childLayoutWrapper =>
        Array.from(childLayoutWrapper.componentRef.instance.templatesContainerComponents || [])
          .map(templatesContainerComponent => Array.from(templatesContainerComponent.layoutWrapperComponents))
          .reduce((a, b) => a.concat(b), [] as LayoutWrapperComponent[])
      ).reduce((a, b) => a.concat(b), [] as LayoutWrapperComponent[]);

    return grandsonLayoutWrappers.map(grandsonLayoutWrapper => {
      return grandsonLayoutWrapper.componentRef.instance.templatesContainerComponents
        .map(templatesContainerComponent => {
          return this.findParentLayoutWrapperOfTemplatesContainer(templatesContainer, templatesContainerComponent, grandsonLayoutWrapper);
        }).find(v => !!v);
    }).find(v => !!v);
  }

}
