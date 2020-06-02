import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, concat, merge } from 'rxjs';
import { takeUntil, switchMap, map, tap } from 'rxjs/operators';

enum ResizeControl {
  TopLeft,
  TopRight,
  BottomLeft,
  BottomRight,
}

@Component({
  selector: 'cms-html-editor-image-toolbar',
  templateUrl: './image-toolbar.component.html',
  styleUrls: ['./image-toolbar.component.scss']
})
export class ImageToolbarComponent implements OnInit, AfterViewInit {

  @ViewChild('TopLeft') resizeControlTopLeft: ElementRef<HTMLDivElement>;
  @ViewChild('TopRight') resizeControlTopRight: ElementRef<HTMLDivElement>;
  @ViewChild('BottomLeft') resizeControlBottomLeft: ElementRef<HTMLDivElement>;
  @ViewChild('BottomRight') resizeControlBottomRight: ElementRef<HTMLDivElement>;

  @Input() target: HTMLImageElement;

  ResizeControl = ResizeControl;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this._registerResizeControl();
  }

  private _registerResizeControl() {
    const mousedown$ = merge(
      fromEvent<MouseEvent>(this.resizeControlTopLeft.nativeElement, 'mousedown'),
      fromEvent<MouseEvent>(this.resizeControlTopRight.nativeElement, 'mousedown'),
      fromEvent<MouseEvent>(this.resizeControlBottomLeft.nativeElement, 'mousedown'),
      fromEvent<MouseEvent>(this.resizeControlBottomRight.nativeElement, 'mousedown'),
    );
    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseup$ = fromEvent<MouseEvent>(document, 'mouseup');

    const drag$ = mousedown$.pipe(
      switchMap(
        (start) => {
          const controller = start.target || start.srcElement;
          const parent = (controller as HTMLElement).parentElement;

          const fake: HTMLImageElement = document.createElement('img');
          fake.src = this.target.src;
          fake.height = this.target.height;
          fake.width = this.target.width;
          fake.style.position = 'absolute';
          fake.style.border = '1px gray dashed';
          fake.style.opacity = '0.5';

          const helper = document.createElement('div');
          helper.style.position = 'fixed';
          helper.style.background = 'black';
          helper.style.color = 'white';
          helper.style.fontSize = '14px';
          helper.style.padding = '5px';
          helper.style.borderRadius = '5px';

          parent.appendChild(fake);
          parent.appendChild(helper);

          const originHeight = this.target.height;
          const originWidth = this.target.width;

          let previousMove: MouseEvent;

          return mousemove$.pipe(
            tap(move => {
              move.preventDefault();
              const nowPoint = move;
              const previousPoint = previousMove || start;
              const diffX = nowPoint.clientX - previousPoint.clientX;
              const diffY = nowPoint.clientY - previousPoint.clientY;

              if (controller === this.resizeControlTopLeft.nativeElement) {
                fake.style.left = `${diffX}px`;
                fake.style.top = `${diffY}px`;
                fake.style.width = `${originWidth - diffX}px`;
                fake.style.height = `${originHeight - diffY}px`;
              }
              if (controller === this.resizeControlTopRight.nativeElement) {
                fake.style.top = `${diffY}px`;
                fake.style.width = `${originWidth + diffX}px`;
                fake.style.height = `${originHeight - diffY}px`;
              }
              if (controller === this.resizeControlBottomLeft.nativeElement) {
                fake.style.left = `${diffX}px`;
                fake.style.width = `${originWidth - diffX}px`;
                fake.style.height = `${originHeight + diffY}px`;
              }
              if (controller === this.resizeControlBottomRight.nativeElement) {
                fake.style.width = `${originWidth + diffX}px`;
                fake.style.height = `${originHeight + diffY}px`;
              }
              helper.innerText = `${fake.style.width.replace('px', '')} x ${fake.style.height.replace('px', '')}`;
              helper.style.left = `${nowPoint.x + 20}px`;
              helper.style.top = `${nowPoint.y + 20}px`;
            }),
            takeUntil(mouseup$.pipe(
              tap(mouseup => {
                const height = fake.style.height.replace('px', '') || originHeight;
                const width = fake.style.width.replace('px', '') || originWidth;
                parent.removeChild(fake);
                parent.removeChild(helper);
                this.target.height = +height + 2; // +2 for border
                this.target.width = +width + 2; // +2 for border
              })
            ))
          );
        }
      )
    ).subscribe();
  }
}
