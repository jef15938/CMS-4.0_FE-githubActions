import { HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class LayoutWrapperBase implements OnDestroy {
  private _mode: 'preview' | 'edit' = 'preview';
  getMode() { return this._mode }
  setMode(mode: 'preview' | 'edit') { this._mode = mode; }

  nowHover = false;

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
      this.nowHover = true;
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.getMode() === 'edit') {
      this.nowHover = false;
    }
  }
}