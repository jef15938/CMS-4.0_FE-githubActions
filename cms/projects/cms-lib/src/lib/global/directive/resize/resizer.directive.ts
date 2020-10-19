import { Directive, ViewContainerRef, AfterViewInit, OnDestroy, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject, fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

enum Resizer {
  SHOW = '5px solid lightgray',
  HIDE = 'none',
}


enum Cursor {
  PROPERTY = 'cursor',
  RESIZING = 'col-resize',
}

@Directive({
  selector: '[cmsResizer]'
})
export class ResizerDirective implements AfterViewInit, OnDestroy {

  @Input() heightBase: HTMLElement;

  private destroy$ = new Subject();

  private isDragging = false;
  private mouseDown: Observable<Event>;
  private mouseMove: Observable<Event>;
  private mouseUp: Observable<Event>;

  private params: { curCol, nxtCol, pageX, curColWidth, nxtColWidth };

  constructor(
    @Inject(DOCUMENT) private document: any,
    private viewContainerRef: ViewContainerRef,
  ) {

  }

  private getHeightBase(): number {
    return this.heightBase?.offsetHeight || 0;
  }

  ngAfterViewInit(): void {
    const element = this.viewContainerRef.element.nativeElement as HTMLElement;
    const resizer = this.createDiv(this.getHeightBase() || element.offsetHeight);

    element.appendChild(resizer);
    element.style.position = 'relative';

    const contextDocument = this.document as HTMLDocument;
    let contextDocumentOriginCursorStyle = '';

    this.mouseDown = fromEvent(resizer, 'mousedown').pipe(takeUntil(this.destroy$));
    this.mouseMove = fromEvent<Event>(contextDocument, 'mousemove').pipe(takeUntil(this.destroy$));
    this.mouseUp = fromEvent<Event>(contextDocument, 'mouseup').pipe(takeUntil(this.destroy$));

    this.mouseDown.subscribe((e: any) => {
      this.isDragging = true;
      resizer.style.borderRight = Resizer.SHOW;
      contextDocumentOriginCursorStyle = contextDocument.body.getAttribute('style');
      contextDocument.body.setAttribute('style', `${Cursor.PROPERTY}:${Cursor.RESIZING} !important`);

      const curCol = e.target.parentElement;
      const nxtCol = curCol.nextElementSibling;
      const pageX = e.pageX;
      const curColWidth = curCol.offsetWidth;
      const nxtColWidth = nxtCol ? nxtCol.offsetWidth : undefined;
      const params = {
        curCol, nxtCol, pageX, curColWidth, nxtColWidth
      };

      this.params = params;

      resizer.style.height = (this.getHeightBase() || element.offsetHeight) + 'px';
    });

    this.mouseMove.subscribe((e: any) => {
      if (this.params) {
        const params = this.params;
        const diffX = e.pageX - params.pageX;
        // 改成抓百分比
        const containerWidth = params.nxtCol.parentElement.getBoundingClientRect().width;
        // 防止過度縮小
        const limit = 30;
        const curWidthPercentAfter = 100 * (params.curColWidth + (diffX)) / containerWidth;
        const notExceedCondition1 = curWidthPercentAfter > limit;
        const notExceedCondition2 = curWidthPercentAfter < 100 - limit;
        const notExceed = notExceedCondition1 && notExceedCondition2;
        if (params.nxtCol && params.nxtColWidth && notExceed) {
          const nextColWidth = Math.round(100 * (params.nxtColWidth - diffX) / containerWidth);
          const curColWidth = 100 - nextColWidth;
          params.nxtCol.style.width = `${nextColWidth}%`;
          params.curCol.style.width = `${curColWidth}%`;
        }

      }
    });

    this.mouseUp.subscribe(e => {
      this.params = null;
      this.isDragging = false;
      resizer.style.borderRight = Resizer.HIDE;
      contextDocument.body.setAttribute('style', contextDocumentOriginCursorStyle);
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
    div.style.cursor = Cursor.RESIZING;
    div.onmouseover = (ev) => {
      if (this.isDragging) { return; }
      div.style.borderRight = Resizer.SHOW;
    };
    div.onmouseleave = (ev) => {
      if (this.isDragging) { return; }
      div.style.borderRight = Resizer.HIDE;
    };
    return div;
  }

}
