import { Directive, Inject, AfterViewInit, ElementRef, Optional, Injector, OnInit } from '@angular/core';
import { RenderedPageEnvironment } from '../interface/page-environment.interface';
import { RENDERED_PAGE_ENVIRONMENT_ROKEN } from '../injection-token/injection-token';
import { LayoutWrapperBase } from '../../function/wrapper/layout-wrapper/layout-wrapper-base';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
