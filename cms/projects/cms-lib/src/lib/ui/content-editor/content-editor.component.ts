import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentEditorSaveEvent } from './content-editor.interface';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';
import { ActionManager } from './service/action-manager';
import { TabTemplateInfo, FieldType, TemplateInfo, GroupTemplateInfo } from 'layout';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { AddTemplateAction } from './content-editor.action-class';
import { AddTemplateButtonComponent } from './component/add-template-button/add-template-button.component';
import { ContentViewRendererComponent } from './component/content-view-renderer/content-view-renderer.component';
import { TemplateGetResponse } from '../../neuxAPI/bean/TemplateGetResponse';

class ContentInfoModel extends ContentInfo {
  constructor(contentInfo: ContentInfo) {
    super();
    if (!contentInfo) {
      this.templates = [];
    } else {
      this.templates = contentInfo.templates;
    }
  }
}

@Component({
  selector: 'cms-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild(ContentViewRendererComponent) contentViewRenderer: ContentViewRendererComponent;
  @ViewChild(LayoutControlPanelComponent) layoutControlPanel: LayoutControlPanelComponent;
  @ViewChild(ContentControlPanelComponent) contentControlPanel: ContentControlPanelComponent;

  // 編輯對象原始資料
  @Input() contentInfo: ContentInfo;
  // 編輯對象當前資料
  @Input() contentInfoModel: ContentInfoModel;
  // 可選版面資料
  @Input() selectableTemplates: TemplateGetResponse; 

  @Input() btnClose = true;
  @Input() btnSave = true;

  @Output() editorClose = new EventEmitter<ContentInfo>();
  @Output() editorSave = new EventEmitter<ContentEditorSaveEvent>();

  actionManager: ActionManager;

  showActionListPanel = true;

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
    this.actionManager = new ActionManager();
    this.contentInfoModel = new ContentInfoModel(this.contentInfo);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private _setEditorUnsaved() {
    this._saved = false;
  }

  private _setEditorSaved() {
    this._saved = true
  }

  clear() {
    this._setEditorUnsaved();
  }

  close() {
    if (!this._saved) {
      const yes = window.confirm('有尚未儲存的變更，確定關閉？');
      if (!yes) {
        return;
      }
    }
    this.editorClose.emit(this.contentInfoModel);
  }

  save() {
    this.editorSave.emit({
      contentInfo: this.contentInfoModel,
      editorSave: this._setEditorSaved.bind(this),
    });
  }

  selectAddTemplatePosition(event: AddTemplateButtonComponent) {
    this.resetSelected();
    this.layoutControlPanel.setSelected(event);
  }

  undo() {
    this.actionManager.undo();
    this._setEditorUnsaved();
  }

  redo() {
    this.actionManager.redo();
    this._setEditorUnsaved();
  }

  resetSelected() {
    if (this.layoutControlPanel) {
      this.layoutControlPanel.setSelected();
    }
    if (this.contentControlPanel) {
      this.contentControlPanel.setSelected();
    }
  }

  onTemplateSelect(event: { template: ContentTemplateInfo, position: number }) {
    this.actionManager.doAction(new AddTemplateAction({
      contentInfo: this.contentInfoModel,
      position: event.position,
      template: event.template,
    }));
    this.resetSelected();
    this._changeDetectorRef.detectChanges();
  }

}
