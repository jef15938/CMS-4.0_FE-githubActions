import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation, Injector, Input, HostBinding, ElementRef, OnDestroy } from '@angular/core';
import { convertEventToElement, notInElement } from '@neux/ui';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CustomizeBaseDirective } from '../base-component';

export interface FastToolData {
  name: string;
  url: string;
}

@Component({
  selector: 'rdr-fast-tool',
  templateUrl: './fast-tool.component.html',
  styleUrls: ['./fast-tool.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animateSlide', [
      state('false', style({
        transform: 'translateX(192px)',
      })),
      state('true', style({
        transform: 'translateX(0)'
      })),
      transition('false <=> true', animate('400ms cubic-bezier(.65, 0, .35, 1)'))
    ])
  ]
})
export class FastToolComponent extends CustomizeBaseDirective implements OnInit, OnDestroy {
  @HostBinding('@animateSlide') get slideIn() { return this.showFastTool; }
  @Input() fastToolList: FastToolData[];

  private unsubscribe$: Subject<null> = new Subject();
  showFastTool = false;

  constructor(
    injector: Injector,
    protected elementRef: ElementRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    /** Binding Click event */
    fromEvent(document, 'click').pipe(
      convertEventToElement(),
      notInElement(this.elementRef.nativeElement),
      tap(() => this.closeFastTool()),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /** 開關快捷選單 */
  toggleFastTool() {
    this.showFastTool = !this.showFastTool;
  }

  /** 打開快捷選單 */
  openFastTool() {
    this.showFastTool = true;
  }

  /** 關閉快捷選單 */
  closeFastTool() {
    this.showFastTool = false;
  }

}
