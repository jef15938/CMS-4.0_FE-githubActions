import { Directive, AfterViewInit, ElementRef, Injector, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateWrapperBase } from '../../function/wrapper/template-wrapper/template-wrapper-base';

@Directive({
  selector: '[rdrStopEventWhenPreview]'
})
export class StopEventWhenPreviewDirective extends TemplateWrapperBase implements OnInit, AfterViewInit {

  constructor(
    injector: Injector,
    private hostElement: ElementRef,
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
          const isPreview = this.renderPageState.isPreview;
          // 只針對preview
          if (isPreview) {
            this.stopEvent(event);
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

}
