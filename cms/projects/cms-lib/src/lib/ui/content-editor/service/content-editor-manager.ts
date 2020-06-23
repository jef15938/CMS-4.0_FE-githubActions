import { ContentInfo } from './../../../neuxAPI/bean/ContentInfo';
import { LayoutWrapperSelectEvent } from 'layout';
import { ContentInfoStateManager } from './content-info-state-manager';
import { AddTemplateButtonComponent } from '../component/add-template-button/add-template-button.component';

export class ContentEditorManager {

  selectedViewElementEvent: LayoutWrapperSelectEvent;
  selectedTemplateAddBtn: AddTemplateButtonComponent;

  public stateManager: ContentInfoStateManager;

  constructor(
    originContentInfo: ContentInfo,
  ) {
    this.stateManager = new ContentInfoStateManager(originContentInfo);
  }

}
