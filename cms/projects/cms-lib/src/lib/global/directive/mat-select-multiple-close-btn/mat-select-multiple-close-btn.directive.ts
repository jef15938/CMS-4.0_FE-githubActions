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
    btn.innerText = 'X';
    btn.setAttribute('class', 'btn btn-danger');
    btn.setAttribute(
      'style',
      'position:absolute;right:0px;top:0;width:24px;height:24px;line-height:24px;vertical-align:middle;border:1px solid lightgray;border-radius:5px;'
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
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
