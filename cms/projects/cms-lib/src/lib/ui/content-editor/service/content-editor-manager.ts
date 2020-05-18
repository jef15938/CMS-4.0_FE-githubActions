import { ContentInfo } from '../../../neuxAPI/bean/ContentInfo';
import { ContentInfoStateManager } from './content-info-state-manager';
import { LayoutWrapperSelectEvent } from 'layout';
import { AddTemplateButtonComponent } from '../component/add-template-button/add-template-button.component';
import { ContentTemplateInfo } from '../../../neuxAPI/bean/ContentTemplateInfo';

export class ContentEditorManager {

  selectedViewElementEvent: LayoutWrapperSelectEvent;
  selectedTemplateAddBtn: AddTemplateButtonComponent;

  public stateManager: ContentInfoStateManager;

  constructor(
    originContentInfo: ContentInfo,
  ) {
    this.stateManager = new ContentInfoStateManager(originContentInfo);
  }

  moveTemplateUp(templateInfo: ContentTemplateInfo) {
    
  }
}