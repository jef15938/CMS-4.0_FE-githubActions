import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutWrapperSelectEvent, FieldType, LayoutWrapperSelectedTargetType, TemplateType, TemplatesContainerComponent } from 'render';
import { ContentInfo } from './../../../../../global/api/neuxAPI/bean/ContentInfo';
import { ContentEditorManager } from '../../service/content-editor-manager';
import { EditorMode } from '../../content-editor.interface';
import { CheckViewConfig } from '../content-view-renderer/content-view-renderer.interface';
import { ContentEditorService } from '../../content-editor.service';

@Component({
  selector: 'cms-content-control-panel',
  templateUrl: './content-control-panel.component.html',
  styleUrls: ['./content-control-panel.component.scss']
})
export class ContentControlPanelComponent implements OnInit, OnChanges {

  TemplateType = TemplateType;

  readonly scrollIntoViewOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'nearest'
  };

  @Input() manager: ContentEditorManager;
  @Input() selected: LayoutWrapperSelectEvent;

  @Output() needCheckView = new EventEmitter<CheckViewConfig>();
  @Output() needScale = new EventEmitter<boolean>();
  @Output() changePreserve = new EventEmitter();

  LayoutWrapperSelectedTargetType = LayoutWrapperSelectedTargetType;
  FieldType = FieldType;

  // 用來判斷資料是否異動過
  hasChange = false;

  show = false;

  canTemplateMoveUp = false;
  canTemplateMoveDown = false;

  constructor(
    private contentEditorService: ContentEditorService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const previous = changes.selected.previousValue as LayoutWrapperSelectEvent;
      const current = changes.selected.currentValue as LayoutWrapperSelectEvent;
      if (previous) {
        previous.selectedTarget.classList.remove('now-edit');
      }
      if (current) {
        current.selectedTarget.classList.add('now-edit');
        current.selectedTarget.scrollIntoView(this.scrollIntoViewOptions);
        this.calCanTemplateMove();
      }
      this.show = !!current;
    }
  }

  /**
   * 套用變更
   */
  preserveChanges(action?: string) {
    const targetType = this.selected.selectedTargetType;
    const target: string[] = [];
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
   */
  templateShowInfo() {
    this.contentEditorService.openEditor({
      contentInfo: { templates: [this.selected.templateInfo] } as ContentInfo,
      mode: EditorMode.INFO,
      selectableTemplates: {} as any
    }).subscribe();
  }

  templateMove(direction: 'up' | 'down') {
    const templateInfos = this.selected.wrapper.parentTemplatesContainer.templates;
    const selectedTemplateInfo = this.selected.templateInfo;
    const index = templateInfos.indexOf(selectedTemplateInfo);

    const up = direction === 'up' && index > 0;
    const down = direction === 'down' && index !== templateInfos.length - 1;

    if (!(up || down)) { return; }

    if (up) { // 資料與前一個交換位置
      templateInfos[index] = templateInfos[index - 1];
      templateInfos[index - 1] = selectedTemplateInfo;
    }

    if (down) { // 資料與後一個交換位置
      templateInfos[index] = templateInfos[index + 1];
      templateInfos[index + 1] = selectedTemplateInfo;
    }

    this.hasChange = true;
    this.calCanTemplateMove();
    this.needScale.emit(true);
    this.needCheckView.emit();
    this.selected.selectedTarget.scrollIntoView(this.scrollIntoViewOptions);
  }

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

  private calCanTemplateMove() {
    this.canTemplateMoveUp = this.selected?.wrapper?.parentTemplatesContainer?.templates.indexOf(this.selected.templateInfo) > 0;
    this.canTemplateMoveDown =
      this.selected?.wrapper?.parentTemplatesContainer?.templates.indexOf(this.selected.templateInfo)
      !== this.selected?.wrapper?.parentTemplatesContainer?.templates?.length - 1;
  }

}
