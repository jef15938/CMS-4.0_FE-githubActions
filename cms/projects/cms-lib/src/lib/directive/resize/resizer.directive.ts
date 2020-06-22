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

    this.mouseDown.subscribe(e => {
      const curCol = e.target['parentElement'];
      const nxtCol = curCol.nextElementSibling;
      const pageX = e['pageX'];
      const curColWidth = curCol.offsetWidth;
      const nxtColWidth = nxtCol ? nxtCol.offsetWidth : undefined;
      const params = {
        curCol, nxtCol, pageX, curColWidth, nxtColWidth
      };
      this.params = params;
    });

    this.mouseMove.subscribe(e => {
      if (this.params) {
        const params = this.params;
        const diffX = e['pageX'] - params.pageX;
        if (params.nxtCol && params.nxtColWidth) {
          params.nxtCol.style.width = (params.nxtColWidth - (diffX)) + 'px';
        }
        params.curCol.style.width = (params.curColWidth + diffX) + 'px';
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
