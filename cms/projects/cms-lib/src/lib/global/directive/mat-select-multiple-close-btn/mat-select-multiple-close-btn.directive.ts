import { Directive, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'mat-select[cmsMatSelectMultipleCloseBtn][multiple]'
})
export class MatSelectMultipleCloseBtnDirective implements OnInit, OnDestroy {

  // tslint:disable-next-line: no-input-rename
  @Input('cmsMatSelectMultipleCloseBtn') select: MatSelect;

  private destroy$ = new Subject<any>();
  private btn: HTMLButtonElement;

  constructor() { }

  ngOnInit() {
    const btn = document.createElement('button');
    btn.innerText = '關閉';
    btn.setAttribute('class', 'btn btn-cancel');
    btn.setAttribute(
      'style',
      'position:relative;left:0;bottom:0;width:100%;height:3em;line-height:3em;vertical-align:middle;border:1px solid lightgray;'
    );
    this.btn = btn;

    fromEvent(this.btn, 'click').pipe(
      takeUntil(this.destroy$),
    ).subscribe((ev: MouseEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (this.select.panelOpen) {
        this.select.close();
      }
    });

    this.select.openedChange.pipe(
      takeUntil(this.destroy$),
    ).subscribe(opened => {
      if (opened) {
        const panelEl = this.select.panel.nativeElement as HTMLElement;
        const parent = panelEl.parentElement;
        parent.appendChild(this.btn);
      } else {
        this.unregisterBtn();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.unregisterBtn();
  }

  private unregisterBtn() {
    if (this.btn?.parentElement) {
      this.btn.parentElement.removeChild(this.btn);
    }
  }

}
