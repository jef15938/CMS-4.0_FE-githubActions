import { Directive, ViewContainerRef, AfterViewInit, OnDestroy, Input, AfterViewChecked } from '@angular/core';
import { Subject, fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[cmsTableResizer]'
})
export class TableResizerDirective implements AfterViewInit, OnDestroy, AfterViewChecked {

  @Input() heightBase: HTMLElement;

  private destroy$ = new Subject();

  private mouseDown: Observable<Event>;
  private mouseMove: Observable<Event>;
  private mouseUp: Observable<Event>;

  private params: { curCol, nxtCol, pageX, curColWidth, nxtColWidth };

  private element: HTMLElement;
  private resizer: HTMLDivElement;

  constructor(
    private viewContainerRef: ViewContainerRef,
  ) {

  }

  ngAfterViewChecked(): void {
    this.element.style.position = 'relative';
  }

  ngAfterViewInit(): void {

    this.element = this.viewContainerRef.element.nativeElement as HTMLElement;
    this.resizer = this.createDiv(this.heightBase ? this.heightBase.offsetHeight : this.element.offsetHeight);
    this.resizer.onclick = (ev: MouseEvent) => ev.stopPropagation();
    this.element.appendChild(this.resizer);

    this.mouseDown = fromEvent(this.resizer, 'mousedown').pipe(takeUntil(this.destroy$));
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
        const limit = 100; // 防止過度縮小
        const curColWidthAfter = params.curColWidth + diffX;
        const nextColWidthAfter = params.nxtColWidth - diffX;
        const canMove = params.nxtCol && params.nxtColWidth && curColWidthAfter >= limit && nextColWidthAfter >= limit;
        if (canMove) {
          params.curCol.style.width = `${curColWidthAfter}px`;
          params.nxtCol.style.width = `${nextColWidthAfter}px`;
        }

      }
    });

    this.mouseUp.subscribe(e => {
      this.params = null;
    });
  }

  ngOnDestroy(): void {
    console.warn('destroy');
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
