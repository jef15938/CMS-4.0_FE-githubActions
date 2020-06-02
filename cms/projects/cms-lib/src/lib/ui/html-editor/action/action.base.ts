import { IHtmlEditorAction } from './action.interface';
import { Injector, Injectable } from '@angular/core';
import { SelecitonRangeService } from '../service/selection-range-service';
import { ModalService } from '../../modal/modal.service';

@Injectable({ providedIn: 'root' })
export abstract class HtmlEditorAction implements IHtmlEditorAction {
  abstract do(editorBlock: HTMLDivElement, ...args): void;

  protected modalService: ModalService;

  constructor(
    protected injector: Injector,
    protected selecitonRangeService: SelecitonRangeService,
  ) {
    this.modalService = this.injector.get(ModalService);
  }
}