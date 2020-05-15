import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentEditorSaveEvent } from './content-editor.interface';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentInfoManager } from './service/content-info-manager';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { AddTemplateButtonComponent } from './component/add-template-button/add-template-button.component';
import { ContentViewRendererComponent } from './component/content-view-renderer/content-view-renderer.component';
import { TemplateGetResponse } from '../../neuxAPI/bean/TemplateGetResponse';

@Component({
  selector: 'cms-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild(ContentViewRendererComponent) contentViewRenderer: ContentViewRendererComponent;
  @ViewChild(LayoutControlPanelComponent) layoutControlPanel: LayoutControlPanelComponent;
  @ViewChild(ContentControlPanelComponent) contentControlPanel: ContentControlPanelComponent;

  // 編輯對象外部提供資料
  @Input() contentInfo: ContentInfo;
  // 可選版面資料
  @Input() selectableTemplates: TemplateGetResponse; 

  @Input() btnClose = true;
  @Input() btnSave = true;

  @Output() editorClose = new EventEmitter<ContentInfo>();
  @Output() editorSave = new EventEmitter<ContentEditorSaveEvent>();

  contentInfoManager: ContentInfoManager;

  private _saved = true;

  private _destroy$ = new Subject();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this._init();
  }

  ngAfterContentChecked(): void {
    this._changeDetectorRef.detectChanges();
  }

  private _init() {
    this.resetSelected();
    this.contentInfoManager = new ContentInfoManager(this.contentInfo);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  setEditorUnsaved() {
    this._saved = false;
  }

  setEditorSaved() {
    this._saved = true
  }

  clear() {
    this.setEditorUnsaved();
  }

  close() {
    if (!this._saved) {
      const yes = window.confirm('有尚未儲存的變更，確定關閉？');
      if (!yes) {
        return;
      }
    }
    this.editorClose.emit(this.contentInfoManager.contentInfoEditModel);
  }

  save() {
    this.editorSave.emit({
      contentInfo: this.contentInfoManager.contentInfoEditModel,
      editorSave: this.setEditorSaved.bind(this),
    });
  }

  selectAddTemplateEvent(event: AddTemplateButtonComponent) {
    this.resetSelected();
    this.layoutControlPanel.setSelected(event);
  }

  resetSelected() {
    if (this.layoutControlPanel) {
      this.layoutControlPanel.setSelected();
    }
    if (this.contentControlPanel) {
      this.contentControlPanel.setSelected();
    }
  }

}
