import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentEditorSaveEvent } from './content-editor.interface';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';
import { ActionManager } from './service/action-manager';
import { TabTemplateInfo, FieldType, TemplateInfo } from 'layout';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { AddTemplateAction } from './content-editor.action-class';

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
    this.actionManager = new ActionManager();
    this.contentInfoModel = new ContentInfoModel(this.contentInfo);
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
        children: {
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
        children: {
          id: '3',
          templateId: 'Slide',
          fieldList: [],
          attributeMap: new Map(),
          toJson: () => ''
        }
      }],
      toJson: () => ''
    };

    const fieldsDemoTemplateInfo: TemplateInfo = {
      id: 'fd01',
      templateId: 'FieldsDemo',
      fieldList: [
        {
          fieldId: 'f01',
          fieldType: FieldType.TEXT,
          fieldVal: 'This is TEXT field.',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f02',
          fieldType: FieldType.TEXTEREA,
          fieldVal: 'This is TEXTEREA field.',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f03',
          fieldType: FieldType.LINK,
          fieldVal: 'https://www.google.com.tw',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f04',
          fieldType: FieldType.BGIMG,
          fieldVal: 'https://garden.decoder.com.tw/demo_cms/assets/img/CMS-login-bg.png',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f05',
          fieldType: FieldType.IMG,
          fieldVal: 'http://www.neux.com.tw/neuximg/neuxLOGO.png',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f06',
          fieldType: FieldType.GROUP,
          fieldVal: '',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f06',
          fieldType: FieldType.HTMLEDITOR,
          fieldVal: '',
          extensionMap: new Map(),
        }
      ],
      attributeMap: new Map(),
      toJson: () => ''
    };

    const mock: ContentInfo = {
      templateList: [
        fieldsDemoTemplateInfo,
        tabTemplateInfo
      ],
      templates: [
        fieldsDemoTemplateInfo,
        tabTemplateInfo
      ],
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

  selectAddTemplatePosition(event, position = 0) {
    event.stopPropagation();
    this.resetSelected();
    this.layoutControlPanel.setPosition(position);
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
      this.layoutControlPanel.setPosition();
    }
    if (this.contentControlPanel) {
      this.contentControlPanel.setContent();
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
