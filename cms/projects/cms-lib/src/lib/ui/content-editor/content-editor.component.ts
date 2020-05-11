import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentEditorSaveEvent } from './content-editor.interface';
import { EditorAction, AddTemplateAction } from './content-editor.action-class';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';
import { ActionManager } from './service/action-manager';
import { TabTemplateInfo, FieldType } from 'layout';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';

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
  
  @ViewChild(LayoutControlPanelComponent) layoutControlPanel: LayoutControlPanelComponent;
  @ViewChild(ContentControlPanelComponent) contentControlPanel: ContentControlPanelComponent;

  @Input() contentInfo: ContentInfo;
  contentInfoModel: ContentInfoModel;

  @Input() btnClose = true;
  @Input() btnSave = true;

  @Output() editorClose = new EventEmitter<ContentInfo>();
  @Output() editorSave = new EventEmitter<ContentEditorSaveEvent>();

  actionManager: ActionManager;

  showActionListPanel = true;

  selectedTemplateAddPosition = -1;
  selectedContentTemplate: any;

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
    this.contentInfo = this._getMock();
    console.warn('this.contentInfo = ', this.contentInfo);
    this.actionManager = new ActionManager();
    this.contentInfoModel = new ContentInfoModel(this.contentInfo);
    console.warn('this.contentInfoModel = ', this.contentInfoModel);
  }

  private _getMock(): ContentInfo {
    const tabTemplateInfo: TabTemplateInfo = {
      id: '1',
      templateId: 'Tab',
      fieldList: [],
      attributeMap: new Map(),
      tabList: [{
        fieldId: '1-1',
        fieldType: FieldType.GROUP,
        fieldVal: '',
        extensionMap: new Map(),
        tabId: '1-1',
        child: {
          id: '2',
          templateId: 'IconPage',
          fieldList: [],
          attributeMap: new Map(),
          toJson: () => ''
        }
      }, {
        fieldId: '1-2',
        fieldType: FieldType.GROUP,
        fieldVal: '',
        extensionMap: new Map(),
        tabId: '1-2',
        child: {
          id: '3',
          templateId: 'Slide',
          fieldList: [],
          attributeMap: new Map(),
          toJson: () => ''
        }
      }],
      toJson: () => ''
    };

    const mock: ContentInfo = {
      templateList: [tabTemplateInfo],
      templates: [tabTemplateInfo],
    } as any;

    return mock as any;
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

  addTemplate(event, position = 0) {
    event.stopPropagation();
    this.resetSelected();
    this.selectedTemplateAddPosition = position;
    // this.actionManager.doAction(new AddTemplateAction({ contentInfo: this.contentInfoModel, position }));
    // this._setEditorUnsaved();
  }

  selectContent(event, template) {
    event.stopPropagation();
    this.resetSelected();
    this.selectedContentTemplate = template;
    // this._setEditorUnsaved();
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
    this.selectedTemplateAddPosition = -1;
    this.selectedContentTemplate = undefined;
  }

}
