import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentEditorSaveEvent } from './content-editor.interface';
import { EditorAction, AddTemplateAction } from './content-editor.action-class';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';
import { ActionManager } from './service/action-manager';

class ContentInfoModel extends ContentInfo {
  constructor(contentInfo: ContentInfo) {
    super();
    if (!contentInfo) {
      this.templates = [];
    }
  }
}

@Component({
  selector: 'cms-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit, OnDestroy {

  @Input() contentInfo: ContentInfo;
  contentInfoModel: ContentInfoModel;

  @Input() btnClose = true;
  @Input() btnSave = true;

  @Output() editorClose = new EventEmitter<ContentInfo>();
  @Output() editorSave = new EventEmitter<ContentEditorSaveEvent>();

  actionManager: ActionManager;

  showActionListPanel = true;
  get showTemplateControlPanel(): boolean { return this.selectedTemplateAddPosition > -1 };

  selectedTemplateAddPosition = -1;

  private _saved = true;

  private _destroy$ = new Subject();

  constructor() {

  }

  ngOnInit(): void {
    this._init();
  }

  private _init() {
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

  addTemplate(position = 0) {
    this.selectedTemplateAddPosition = position;
    this.actionManager.doAction(new AddTemplateAction({ contentInfo: this.contentInfoModel, position }));
    this._setEditorUnsaved();
  }

  undo() {
    this.actionManager.undo();
    this._setEditorUnsaved();
  }

  redo() {
    this.actionManager.redo();
    this._setEditorUnsaved();
  }

}
