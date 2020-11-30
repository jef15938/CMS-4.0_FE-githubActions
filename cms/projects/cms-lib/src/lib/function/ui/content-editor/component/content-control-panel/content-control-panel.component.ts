import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {
  TemplateWrapperSelectEvent, TemplateWrapperSelectedTargetType, CustomizeTemplateBaseComponent,
  TemplateType, TemplatesContainerComponent, DataSourceTemplateBaseComponent, TemplateBaseComponent
} from '@neux/render';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { ContentEditorManager } from '../../service/content-editor-manager';
import { ContentEditorContext } from '../../content-editor.interface';
import { CheckViewConfig } from '../content-view-renderer/content-view-renderer.interface';
import { ContentFieldInfoFieldType } from '../../../../../global/api/data-model/models/content-field-info.model';
import { ModalService } from '../../../modal';
import { ListContentDataSourceResponseModel } from '../../../../../global/api/data-model/models/list-content-data-source-response.model';
import { ContentService } from '../../../../../global/api/service';
import { CmsErrorHandler } from '../../../../../global/error-handling';
import { ContentDataSourceActionModel, ContentDataSourceActionType } from '../../../../../global/api/data-model/models/content-data-source-action.model';
import { FarmSharedService } from '../../../farm-shared/farm-shared.service';

class DataSourceManager {
  private instance: any;
  /** 讓 template 區分是不是有效(有typeId)可以實行 actions，或是有 typeId 但沒有 actions 資料 */
  isActionable = false;
  info$: Observable<ListContentDataSourceResponseModel>;

  private refresh$ = new BehaviorSubject<string>('');

  constructor(
    private contentService: ContentService,
  ) {
    this.info$ = this.getData();
  }

  private getData() {
    return this.refresh$.pipe(
      switchMap(typeId => {
        if (!typeId) { return of(null); }
        return this.contentService.getContentDataSourceByTypeID(typeId).pipe(
          CmsErrorHandler.rxHandleError((error, showMessage) => {
            showMessage();
            this.info$ = this.getData();
          }),
        );
      }),
      shareReplay()
    );
  }

  private checkInstanceIsDataSourceOrCustomize(instance: any) {
    if (!instance) { return false; }
    let isDataSource = false;
    let isCustomize = false;
    if (instance instanceof DataSourceTemplateBaseComponent) {
      isDataSource = true;
    } else if (instance instanceof CustomizeTemplateBaseComponent) {
      isCustomize = true;
    }
    return isDataSource || isCustomize;
  }

  private getTypeIdByInstance(instance: TemplateBaseComponent<any>): string {
    if (!instance) { return ''; }
    let typeId = '';
    if (
      instance instanceof DataSourceTemplateBaseComponent
      || instance instanceof CustomizeTemplateBaseComponent
    ) {
      typeId = instance.TYPE_ID;
    }
    return typeId;
  }

  refresh(instance: TemplateBaseComponent<any>) {
    this.instance = instance;
    const isInstanceDataSourceOrCustomize = this.checkInstanceIsDataSourceOrCustomize(instance);
    this.isActionable = isInstanceDataSourceOrCustomize;
    const typeId = isInstanceDataSourceOrCustomize ? this.getTypeIdByInstance(instance) : '';
    this.refresh$.next(typeId);
    return this;
  }
}

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
  @Input() selected: TemplateWrapperSelectEvent;
  @Input() context: ContentEditorContext;

  @Output() needCheckView = new EventEmitter<CheckViewConfig>();
  @Output() templateMove = new EventEmitter<boolean>();

  TemplateWrapperSelectedTargetType = TemplateWrapperSelectedTargetType;
  FieldType = ContentFieldInfoFieldType;

  // 用來判斷資料是否異動過
  hasChange = false;

  show = false;

  canTemplateMoveUp = false;
  canTemplateMoveDown = false;

  dataSourceManager: DataSourceManager;

  constructor(
    private modalService: ModalService,
    private contentService: ContentService,
    private farmSharedService: FarmSharedService,
  ) {
    this.dataSourceManager = new DataSourceManager(this.contentService);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {

      const previous = changes.selected.previousValue as TemplateWrapperSelectEvent;
      const current = changes.selected.currentValue as TemplateWrapperSelectEvent;
      if (previous) {
        previous.selectedTarget.classList.remove('now-edit');
      }
      if (current) {
        current.selectedTarget.classList.add('now-edit');
        current.selectedTarget.scrollIntoView(this.scrollIntoViewOptions);
        this.calCanTemplateMove();
      }

      const instance = current?.componentRef?.instance;
      this.dataSourceManager.refresh(instance);

      this.show = !!current;
    }
  }

  showTemplateRule() {
    this.modalService.openShowImage({ imageUrl: './assets/img/CMS-login-bg.png' }).subscribe();
  }

  /**
   * 套用變更
   */
  preserveChanges(action?: string) {
    const targetType = this.selected.selectedTargetType;
    const target: string[] = [];
    switch (targetType) {
      case TemplateWrapperSelectedTargetType.TEMPLATE:
        target.push(`[${TemplateWrapperSelectedTargetType.TEMPLATE}]${this.selected.templateInfo.id}`);
        break;
      case TemplateWrapperSelectedTargetType.FIELD:
        target.push(`[${TemplateWrapperSelectedTargetType.TEMPLATE}]${this.selected.templateInfo.id}`);
        target.push(`[${TemplateWrapperSelectedTargetType.FIELD}]${this.selected.fieldInfo.fieldId}`);
        break;
    }
    // const msg = action || `變更:${targetType} : ${target.join(' ')}`;
    const msg = action || `變更內容`;
    this.manager.stateManager.preserveState(msg);
    this.hasChange = false;
  }

  /**
   * 顯示版型info
   */
  templateShowInfo() {
    const templateId = this.selected?.templateInfo?.templateId;
    if (!templateId) {
      this.modalService.openMessage({ message: '沒有版面資訊' }).subscribe();
      return;
    }

    const imageUrl = `./assets/img/template-rule/${templateId}.png`;
    this.modalService.openShowImage({ imageUrl }).subscribe();
    // 舊程式
    // const languageInfo = new LanguageInfoModel();
    // const contentBlockInfo = new ContentBlockInfoModel();
    // contentBlockInfo.templates = [this.selected.templateInfo as any];
    // languageInfo.blocks = [contentBlockInfo];
    // const contentInfo = new ContentInfoModel();
    // contentInfo.languages = [languageInfo];

    // this.contentEditorService.openEditorInfo(contentInfo).subscribe();
  }

  moveTemplate(direction: 'up' | 'down') {
    const currentLanguageTemplateInfos = this.selected.wrapper.parentTemplatesContainer.templates;
    const selectedTemplateInfo = this.selected.templateInfo;
    const index = currentLanguageTemplateInfos.indexOf(selectedTemplateInfo);
    const selectedTemplateInfoId = selectedTemplateInfo.id;

    const up = direction === 'up' && index > 0;
    const down = direction === 'down' && index !== currentLanguageTemplateInfos.length - 1;

    if (!(up || down)) { return; }

    const rootTemplatesContainersOfBlocksByLanguages = this.context.getRootTemplatesContainersOfBlocksByLanguage();
    const templateWrappers = rootTemplatesContainersOfBlocksByLanguages
      .map(rootTemplatesContainersOfBlocksByLanguage => {
        return rootTemplatesContainersOfBlocksByLanguage.map(rootTemplatesContainer =>
          this.context.findTemplateWrapperByTemplateInfoId(selectedTemplateInfoId, rootTemplatesContainer)
        ).find(v => !!v);
      });

    templateWrappers.forEach(templateWrapper => {
      const templateInfo = templateWrapper.templateInfo;
      const belongedTemplates = templateWrapper.parentTemplatesContainer.templates;

      if (up) { // 資料與前一個交換位置
        belongedTemplates[index] = belongedTemplates[index - 1];
        belongedTemplates[index - 1] = templateInfo;
      }
      if (down) { // 資料與後一個交換位置
        belongedTemplates[index] = belongedTemplates[index + 1];
        belongedTemplates[index + 1] = templateInfo;
      }
    });

    this.preserveChanges(`移動版型(${direction === 'up' ? '上' : '下'}):${selectedTemplateInfo.id}`);
    // this.hasChange = true;
    this.calCanTemplateMove();
    this.templateMove.emit(true);
    this.needCheckView.emit();
    this.selected.selectedTarget.scrollIntoView(this.scrollIntoViewOptions);
  }

  deleteTemplate() {
    const currentLanguageTemplateInfos = this.selected.wrapper.parentTemplatesContainer.templates;
    const selectedTemplateInfo = this.selected.templateInfo;
    const index = currentLanguageTemplateInfos.indexOf(selectedTemplateInfo);
    const selectedTemplateInfoId = selectedTemplateInfo.id;

    if (index > -1) {
      // 處理畫面
      const templatesContainer = this.selected.wrapper.parentTemplatesContainer as TemplatesContainerComponent;
      const templateWrapperComponents = Array.from(templatesContainer.templateWrapperComponents);
      const nextIndex = (index === currentLanguageTemplateInfos.length - 1) ? 0 : index + 1;
      const next = templateWrapperComponents[nextIndex];
      // 處理資料
      const rootTemplatesContainersOfBlocksByLanguages = this.context.getRootTemplatesContainersOfBlocksByLanguage();
      const templateWrappers = rootTemplatesContainersOfBlocksByLanguages
        .map(rootTemplatesContainersOfBlocksByLanguage => {
          return rootTemplatesContainersOfBlocksByLanguage.map(rootTemplatesContainer =>
            this.context.findTemplateWrapperByTemplateInfoId(selectedTemplateInfoId, rootTemplatesContainer)
          ).find(v => !!v);
        });

      templateWrappers.forEach(templateWrapper =>
        templateWrapper.parentTemplatesContainer.templates.splice(
          templateWrapper.parentTemplatesContainer.templates.indexOf(templateWrapper.templateInfo), 1)
      );

      this.preserveChanges(`刪除版型:${selectedTemplateInfo.id}`);
      // this.hasChange = true;
      this.needCheckView.emit({ select: next });
    }
  }

  private calCanTemplateMove() {
    this.canTemplateMoveUp = this.selected?.wrapper?.parentTemplatesContainer?.templates.indexOf(this.selected.templateInfo) > 0;
    this.canTemplateMoveDown =
      this.selected?.wrapper?.parentTemplatesContainer?.templates.indexOf(this.selected.templateInfo)
      !== this.selected?.wrapper?.parentTemplatesContainer?.templates?.length - 1;
  }

  doAction(action: ContentDataSourceActionModel) {
    switch (action.actionType) {
      case ContentDataSourceActionType.FARM:
        this.farmSharedService.openFarm(action.funcId);
        break;
    }
  }

}
