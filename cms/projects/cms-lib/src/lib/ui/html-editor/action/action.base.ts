import { IHtmlEditorAction } from './action.interface';
import { Injector, Injectable } from '@angular/core';
import { SelecitonRangeService } from '../service/selection-range-service';

@Injectable({ providedIn: 'root' })
export abstract class HtmlEditorAction implements IHtmlEditorAction {
  abstract do(editorBlock: HTMLDivElement): void;

  constructor(
    protected injector: Injector,
    protected selecitonRangeService: SelecitonRangeService,
  ) { }
}