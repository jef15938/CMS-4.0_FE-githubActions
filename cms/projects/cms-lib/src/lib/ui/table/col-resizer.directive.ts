import { Directive, ViewContainerRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[cmsColResizer]'
})
export class ColResizerDirective implements AfterViewInit, OnDestroy {

  private _destroy$ = new Subject();

  private _mouseDown: Observable<Event>;
  private _mouseMove: Observable<Event>;
  private _mouseUp: Observable<Event>;

  private _params: { curCol, nxtCol, pageX, curColWidth, nxtColWidth };

  constructor(
    private _viewContainerRef: ViewContainerRef,
  ) {

  }

  ngAfterViewInit(): void {

    const element = this._viewContainerRef.element.nativeElement as HTMLElement;
    const resizer = this._createDiv(element.offsetHeight);

    element.appendChild(resizer);
    element.style.position = 'relative';

    this._mouseDown = fromEvent(resizer, 'mousedown').pipe(takeUntil(this._destroy$));
    this._mouseMove = fromEvent(document, 'mousemove').pipe(takeUntil(this._destroy$));
    this._mouseUp = fromEvent(document, 'mouseup').pipe(takeUntil(this._destroy$));

    this._mouseDown.subscribe(e => {
      const curCol = e.target['parentElement'];
      const nxtCol = curCol.nextElementSibling;
      const pageX = e['pageX'];
      const curColWidth = curCol.offsetWidth;
      const nxtColWidth = nxtCol ? nxtCol.offsetWidth : undefined;
      const params = {
        curCol, nxtCol, pageX, curColWidth, nxtColWidth
      };
      this._params = params;
    });

    this._mouseMove.subscribe(e => {
      if (this._params) {
        const params = this._params;
        const diffX = e['pageX'] - params.pageX;
        if (params.nxtCol && params.nxtColWidth) {
          params.nxtCol.style.width = (params.nxtColWidth - (diffX)) + 'px';
        }
        params.curCol.style.width = (params.curColWidth + diffX) + 'px';
      }
    });

    this._mouseUp.subscribe(e => {
      this._params = null;
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private _createDiv(height: number) {
    const div = document.createElement('div');
    div.className = 'cms-col-resizer';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.right = '0';
    div.style.width = '5px';
    div.style.userSelect = 'none';
    div.style.height = height + 'px';
    div.style.cursor = 'col-resize';
    return div;
  }

}
