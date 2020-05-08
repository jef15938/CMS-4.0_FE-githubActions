import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentEditorSaveEvent } from './content-editor.interface';
import { EditorAction, AddTemplateAction } from './content-editor.action-class';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { ContentTemplateInfo } from '../../neuxAPI/bean/ContentTemplateInfo';

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

  get canUndo(): boolean { return this.actions.indexOf(this.latestAction) > -1 };
  get canRedo(): boolean { return this.actions.indexOf(this.latestAction) !== this.actions.length - 1 };

  showActionListPanel = true;
  get showTemplateControlPanel(): boolean { return this.selectedTemplateAddPosition > -1 };

  selectedTemplateAddPosition = -1;

  latestAction: EditorAction;
  actions: EditorAction[] = [];

  private _saved = true;

  private _destroy$ = new Subject();

  constructor() {

  }

  ngOnInit(): void {
    this._init();
  }

  private _init() {
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

  private _doAction(action: EditorAction) {
    // 清除後面
    const latestActionIndex = this.actions.indexOf(this.latestAction);
    this.actions.splice(
      latestActionIndex + 1,
      this.actions.length - (latestActionIndex + 1)
    );
    this.latestAction = action;
    this.actions.push(action);
    this._setEditorUnsaved();
  }

  undo() {
    if (!this.canUndo) { return; }
    const latestActionIndex = this.actions.indexOf(this.latestAction);
    const previousAction = this.actions[latestActionIndex - 1];
    // TODO: doAction
    this.latestAction = previousAction;
    this._setEditorUnsaved();
  }

  redo() {
    if (!this.canRedo) { return; }
    const latestActionIndex = this.actions.indexOf(this.latestAction);
    const nextAction = this.actions[latestActionIndex + 1];
    // TODO: diAction
    this.latestAction = nextAction;
    this._setEditorUnsaved();
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
    const template = new ContentTemplateInfo();
    this.contentInfoModel.templates.splice(position, 0, template);
    this._doAction(new AddTemplateAction());
    this._setEditorUnsaved();
  }

}
