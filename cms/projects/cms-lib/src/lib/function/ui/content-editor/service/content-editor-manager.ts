import { LayoutWrapperSelectEvent } from '@neux/render';
import { ContentInfoStateManager } from './content-info-state-manager';
import { AddTemplateButtonComponent } from '../component/add-template-button/add-template-button.component';
import { ContentInfoModel } from '../../../../global/api/data-model/models/content-info.model';

export class ContentEditorManager {

  selectedViewElementEvent: LayoutWrapperSelectEvent;
  selectedTemplateAddBtn: AddTemplateButtonComponent;

  public stateManager: ContentInfoStateManager;

  constructor(
    originContentInfo: ContentInfoModel,
  ) {
    this.stateManager = new ContentInfoStateManager(originContentInfo);
  }

}
