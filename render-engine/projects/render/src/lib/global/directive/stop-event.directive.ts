import { Directive, Inject, AfterViewInit, ElementRef, Optional, Injector, OnInit } from '@angular/core';

import { RenderedPageEnvironment } from '../interface/page-environment.interface';
import { RENDERED_PAGE_ENVIRONMENT_ROKEN } from '../injection-token/injection-token';

import { LayoutWrapperBase } from '../../function/wrapper/layout-wrapper/layout-wrapper-base';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PreviewCommand, PreviewCommandData } from '../interface';
import { PreviewCommandType } from '../enum/preview-command.enum';


@Directive({
  selector: '[rdrStopEvent]'
})
export class StopEventDirective extends LayoutWrapperBase implements OnInit, AfterViewInit {

  constructor(injector: Injector, private hostElement: ElementRef,
    @Optional() @Inject(RENDERED_PAGE_ENVIRONMENT_ROKEN) private pageEnv: RenderedPageEnvironment
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.listenToClick();
  }

  /**
   * 監聽點擊事件
   *
   * @private
   * @memberof StopEventDirective
   */
  private listenToClick() {
    fromEvent<MouseEvent>(this.hostElement.nativeElement.parentNode, 'click', { capture: true }).
      pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event.target === this.hostElement.nativeElement) {
          const isPreview = !this.pageEnv.isRuntime && this.mode !== 'edit';
          if (isPreview) {
            this.stopEvent(event);
            this.handdleATag();
          }
        }
      });
  }

  /**
   * 停止事件傳遞
   *
   * @private
   * @param {MouseEvent} event
   * @memberof StopEventDirective
   */
  private stopEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }


  /**
   * 判斷點擊的元素是否為 a標籤
   * 如果是站外連結 則post Message
   * @private
   * @return {*}
   * @memberof StopEventDirective
   */
  private handdleATag() {
    const aTagPassedBy = this.getEventTargetPathATag(this.hostElement.nativeElement);
    if (!aTagPassedBy) { return; }

    const actionID = (aTagPassedBy.getAttribute('actionid') || '').trim();
    if (actionID) { return; }

    const attributeHref = aTagPassedBy.getAttribute('href');
    if (!attributeHref || attributeHref === '#') { return; }

    const reg = new RegExp('^([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://)');
    const isIncludeHttp = reg.test(attributeHref);
    const passData = { href: aTagPassedBy.href, target: aTagPassedBy.getAttribute('target') };

    if (aTagPassedBy && isIncludeHttp) {
      const previewCommand: PreviewCommand<PreviewCommandData> = { type: PreviewCommandType.LINK, data: passData };
      this.sendCommandToParent(previewCommand);
    }
  }

  /**
   * postMessage
   *
   * @private
   * @param {PreviewCommand<PreviewCommandData>} command
   * @memberof StopEventDirective
   */
  private sendCommandToParent(command: PreviewCommand<PreviewCommandData>) {
    window?.parent?.postMessage(command, '*');
  }

  /**
   * 往上找取得a標籤
   * @private
   * @param {EventTarget} target
   * @return {*}  {HTMLAnchorElement}
   * @memberof RenderPreviewContainerComponent
   */
  private getEventTargetPathATag(target: EventTarget): HTMLAnchorElement {
    if (!target) { return null; }
    const t = target as HTMLElement;
    if (t?.tagName?.toLowerCase() === 'a') {
      return t as HTMLAnchorElement;
    }
    return this.getEventTargetPathATag(t.parentElement);
  }
}
