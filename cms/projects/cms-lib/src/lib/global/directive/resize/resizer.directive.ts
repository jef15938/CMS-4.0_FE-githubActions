import { Directive, ViewContainerRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Subject, fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[cmsResizer]'
})
export class ResizerDirective implements AfterViewInit, OnDestroy {

  @Input() heightBase: HTMLElement;

  private destroy$ = new Subject();

  private mouseDown: Observable<Event>;
  private mouseMove: Observable<Event>;
  private mouseUp: Observable<Event>;

  private params: { curCol, nxtCol, pageX, curColWidth, nxtColWidth };

  constructor(
    private viewContainerRef: ViewContainerRef,
  ) {

  }

  ngAfterViewInit(): void {
    const element = this.viewContainerRef.element.nativeElement as HTMLElement;
    const resizer = this.createDiv(this.heightBase ? this.heightBase.offsetHeight : element.offsetHeight);

    element.appendChild(resizer);
    element.style.position = 'relative';

    this.mouseDown = fromEvent(resizer, 'mousedown').pipe(takeUntil(this.destroy$));
    this.mouseMove = fromEvent(document, 'mousemove').pipe(takeUntil(this.destroy$));
    this.mouseUp = fromEvent(document, 'mouseup').pipe(takeUntil(this.destroy$));

    this.mouseDown.subscribe((e: any) => {
      const curCol = e.target.parentElement;
      const nxtCol = curCol.nextElementSibling;
      const pageX = e.pageX;
      const curColWidth = curCol.offsetWidth;
      const nxtColWidth = nxtCol ? nxtCol.offsetWidth : undefined;
      const params = {
        curCol, nxtCol, pageX, curColWidth, nxtColWidth
      };

      this.params = params;
    });

    this.mouseMove.subscribe((e: any) => {
      if (this.params) {
        const params = this.params;
        const diffX = e.pageX - params.pageX;
        // 改成抓百分比
        const containerWidth = params.nxtCol.parentElement.getBoundingClientRect().width;
        // 防止過度縮小
        const limit = 30;
        const  curWidthPercentAfter = 100 * (params.curColWidth + (diffX)) / containerWidth;
        const notExceedCondition1  = curWidthPercentAfter > limit;
        const notExceedCondition2 = curWidthPercentAfter < 100 - limit;
        console.log(curWidthPercentAfter);
        const notExceed = notExceedCondition1 && notExceedCondition2;
        if (params.nxtCol && params.nxtColWidth && notExceed) {
          params.nxtCol.style.width =  100 * (params.nxtColWidth - diffX) / containerWidth + '%';
          params.curCol.style.width = 100 * (params.curColWidth + diffX) / containerWidth + '%';
        }

      }
    });

    this.mouseUp.subscribe(e => {
      this.params = null;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private createDiv(height: number) {
    const div = document.createElement('div');
    div.className = 'cms-resizer';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.right = '0';
    div.style.width = '3px';
    div.style.userSelect = 'none';
    div.style.height = height + 'px';
    div.style.cursor = 'col-resize';
    return div;
  }

}
