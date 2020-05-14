import { HostListener, OnDestroy, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class LayoutWrapperBase implements OnDestroy {
  private _mode: 'preview' | 'edit' = 'preview';
  getMode() { return this._mode }
  setMode(mode: 'preview' | 'edit') { this._mode = mode; }

  @Output() enter = new EventEmitter<HTMLElement>();
  @Output() leave = new EventEmitter<HTMLElement>();
  abstract elementRef: ElementRef;

  destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  @HostListener('click', ['$event']) clickStopPropagation(ev) {
    if(this.getMode() === 'edit'){
      ev.stopPropagation();
    }
  }

  @HostListener('mouseenter') mouseenter() {
    if (this.getMode() === 'edit') {
      this.enter.next(this.elementRef?.nativeElement);
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.getMode() === 'edit') {
      this.leave.next(this.elementRef?.nativeElement);
    }
  }
}