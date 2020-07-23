import {
  Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild,
  AfterContentChecked, ChangeDetectorRef, ElementRef, AfterViewInit, ViewChildren, QueryList, HostListener
} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { ContentInfo } from '../../../global/api/neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from '../../../global/api/neuxAPI/bean/TemplateGetResponse';
import { ContentEditorSaveEvent, EditorMode, ContentEditorActionMode } from './content-editor.interface';
import { ContentEditorManager } from './service/content-editor-manager';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { ContentViewRendererComponent } from './component/content-view-renderer/content-view-renderer.component';
import { CmsCanDeactiveGuardian } from '../../../global/interface/cms-candeactive-guardian.interface';
import { CmsCanDeactiveGuard } from '../../../global/service/cms-candeactive-guard';

@Component({
  selector: 'cms-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked, CmsCanDeactiveGuardian {
  EditorMode = EditorMode;
  ContentEditorActionMode = ContentEditorActionMode;

  @ViewChild(ContentViewRendererComponent) contentViewRenderer: ContentViewRendererComponent;
  @ViewChild(LayoutControlPanelComponent) layoutControlPanel: LayoutControlPanelComponent;
  @ViewChild(ContentControlPanelComponent) contentControlPanel: ContentControlPanelComponent;

  @ViewChildren('clickCapturelistenerBlock') clickCapturelistenerBlocks: QueryList<ElementRef>;

  // 使用模式
  @Input() editorMode: EditorMode = EditorMode.EDIT;

  // 編輯對象外部提供資料
  @Input() contentInfo: ContentInfo;
  @Input() contentID: string;

  // 可選版面資料
  @Input() selectableTemplates: TemplateGetResponse;

  @Input() btnClose = true;

  @Output() editorClose = new EventEmitter<ContentInfo>();
  @Output() editorSave = new EventEmitter<ContentEditorSaveEvent>();

  manager: ContentEditorManager;

  saved = true;
  isScaleContent = false;

  destroy$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private cmsCanDeactiveGuard: CmsCanDeactiveGuard,
  ) {

  }

  ngOnInit(): void {
    this.cmsCanDeactiveGuard.registerAsGuardian(this);
    this.init(this.contentInfo);
  }

  ngAfterViewInit(): void {
    this.registerClickCaptureListener('register');
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  private init(contentInfo: ContentInfo) {
    this.resetSelected();
    this.manager = new ContentEditorManager(contentInfo);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
    this.registerClickCaptureListener('unregister');
  }

  setEditorUnsaved() {
    this.saved = false;
  }

  setEditorSaved() {
    this.saved = true;
  }

  clear() {
    this.setEditorUnsaved();
  }

  close() {
    if (!this.saved || this.contentControlPanel?.hasChange) {
      const yes = window.confirm('有尚未儲存的變更，確定關閉？');
      if (!yes) { return; }
    }
    this.editorClose.emit(this.manager.stateManager.contentInfoEditModel);
  }

  save() {
    this.editorSave.emit({
      contentInfo: this.manager.stateManager.contentInfoEditModel,
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
   * TODO: 待檢討或優化．
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

}
