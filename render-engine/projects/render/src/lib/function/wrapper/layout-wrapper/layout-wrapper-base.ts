import { HostListener, OnDestroy, Output, EventEmitter, ElementRef, ChangeDetectorRef, Injector, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class LayoutWrapperBase implements OnDestroy {
  mode: 'preview' | 'edit' = 'preview';
  runtime = false;

  protected changeDetectorRef: ChangeDetectorRef = null;
  public elementRef: ElementRef = null;

  @Output() enter = new EventEmitter<HTMLElement>();
  @Output() leave = new EventEmitter<HTMLElement>();

  destroy$ = new Subject();

  constructor(
    protected injector: Injector,
  ) {
    this.changeDetectorRef = injector.get(ChangeDetectorRef);
    this.elementRef = injector.get(ElementRef);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  @HostListener('click', ['$event']) clickStopPropagation(ev) {
    if (this.mode === 'edit') {
      ev.stopPropagation();
    }
  }

  @HostListener('mouseenter') mouseenter() {
    if (this.mode === 'edit') {
      this.enter.next(this.elementRef?.nativeElement);
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.mode === 'edit') {
      this.leave.next(this.elementRef?.nativeElement);
    }
  }
}
