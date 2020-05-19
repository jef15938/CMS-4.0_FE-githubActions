import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { LayoutWrapperSelectEvent, FieldType, LayoutWrapperSelectedTargetType, TemplateType, TemplatesContainerComponent } from 'layout';
import { ContentEditorManager } from '../../service/content-editor-manager';
import { ContentEditorServiceInjectionToken } from '../../content-editor.injection-token';
import { IContentEditorService, EditorMode } from '../../content-editor.interface';
import { ContentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentInfo';

@Component({
  selector: 'cms-content-control-panel',
  templateUrl: './content-control-panel.component.html',
  styleUrls: ['./content-control-panel.component.scss']
})
export class ContentControlPanelComponent implements OnInit, OnChanges {

  TemplateType = TemplateType;

  @Input() manager: ContentEditorManager;
  @Input() selected: LayoutWrapperSelectEvent;

  @Output() needCheckView = new EventEmitter();
  @Output() needScale = new EventEmitter<boolean>();
  @Output() changePreserve = new EventEmitter();

  LayoutWrapperSelectedTargetType = LayoutWrapperSelectedTargetType;
  FieldType = FieldType;

  // 用來判斷資料是否異動過
  hasChange = false;

  get show() { return !!this.selected; }
  get canTemplateMoveUp() {
    return this.selected?.wrapper?.parentTemplatesContainer?.templates.indexOf(this.selected.templateInfo) > 0;
  }
  get canTemplateMoveDown() {
    return this.selected?.wrapper?.parentTemplatesContainer?.templates.indexOf(this.selected.templateInfo) !== this.selected?.wrapper?.parentTemplatesContainer?.templates?.length - 1;
  }

  constructor(
    @Inject(ContentEditorServiceInjectionToken) private _contentEditorService: IContentEditorService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']) {
      const previous = changes['selected'].previousValue as LayoutWrapperSelectEvent;
      const current = changes['selected'].currentValue as LayoutWrapperSelectEvent;
      if (previous) {
        previous.selectedTarget.classList.remove('now-edit');
      }
      if (current) {
        current.selectedTarget.classList.add('now-edit');
      }
    }
  }

  /**
   * 套用變更
   *
   * @memberof ContentControlPanelComponent
   */
  preserveChanges(action?: string) {
    const targetType = this.selected.selectedTargetType;
    let target: string[] = [];
    switch (targetType) {
      case LayoutWrapperSelectedTargetType.TEMPLATE:
        target.push(`[${LayoutWrapperSelectedTargetType.TEMPLATE}]${this.selected.templateInfo.id}`);
        break;
      case LayoutWrapperSelectedTargetType.FIELD:
        target.push(`[${LayoutWrapperSelectedTargetType.TEMPLATE}]${this.selected.templateInfo.id}`);
        target.push(`[${LayoutWrapperSelectedTargetType.FIELD}]${this.selected.fieldInfo.fieldId}`);
        break;
    }
    this.manager.stateManager.preserveState(action || `Change ${targetType} : ${target.join(' ')}`);
    this.hasChange = false;
    this.changePreserve.emit();
    this.needCheckView.emit();
  }

  /**
   * 顯示版型info
   *
   * @memberof ContentControlPanelComponent
   */
  templateShowInfo() {
    this._contentEditorService.openEditor({
      contentInfo: { templates: [this.selected.templateInfo] } as ContentInfo,
      mode: EditorMode.INFO,
      selectableTemplates: {} as any
    }).subscribe();
  }

  /**
   * 版型移動上
   *
   * @memberof ContentControlPanelComponent
   */
  templateMoveUp() {
    const templateInfos = this.selected.wrapper.parentTemplatesContainer.templates;
    const selectedTemplateInfo = this.selected.templateInfo;
    const index = templateInfos.indexOf(selectedTemplateInfo);
    if (index > 0) {
      templateInfos[index] = templateInfos[index - 1];
      templateInfos[index - 1] = selectedTemplateInfo;
      this.hasChange = true;
      this.needScale.emit(true);
      this.needCheckView.emit();
      this.selected.selectedTarget.scrollIntoView();
    }
  }

  /**
   * 版型移動下
   *
   * @memberof ContentControlPanelComponent
   */
  templateMoveDown() {
    const templateInfos = this.selected.wrapper.parentTemplatesContainer.templates;
    const selectedTemplateInfo = this.selected.templateInfo;
    const index = templateInfos.indexOf(selectedTemplateInfo);
    if (index !== templateInfos.length - 1) {
      templateInfos[index] = templateInfos[index + 1];
      templateInfos[index + 1] = selectedTemplateInfo;
      this.hasChange = true;
      this.needScale.emit(true);
      this.needCheckView.emit();
      this.selected.selectedTarget.scrollIntoView();
    }
  }

  /**
   * 刪除版型
   *
   * @memberof ContentControlPanelComponent
   */
  templateDelete() {
    const templateInfos = this.selected.wrapper.parentTemplatesContainer.templates;
    const selectedTemplateInfo = this.selected.templateInfo;
    const index = templateInfos.indexOf(selectedTemplateInfo);

    if (index > -1) {
      // 處理畫面
      const templatesContainer = this.selected.wrapper.parentTemplatesContainer as TemplatesContainerComponent;
      const layoutWrapperComponents = Array.from(templatesContainer.layoutWrapperComponents);
      const nextIndex = (index === templateInfos.length - 1) ? 0 : index + 1;
      const next = layoutWrapperComponents[nextIndex];
      // 處理資料
      templateInfos.splice(index, 1);
      this.hasChange = true;
      this.needCheckView.emit({ select: next });
    }
  }

}
