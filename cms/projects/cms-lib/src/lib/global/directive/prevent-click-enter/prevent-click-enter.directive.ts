import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[cmsPreventClickEnter]'
})
export class PreventClickEnterDirective implements OnInit, OnDestroy {

  private destory$ = new Subject();

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    fromEvent(this.elementRef.nativeElement, 'keydown').pipe(
      takeUntil(this.destory$),
    ).subscribe((e: KeyboardEvent) => {
      if (
        e.code === 'Enter'
        || e.key === 'Enter'
        // tslint:disable-next-line: deprecation
        || e.keyCode === 13
        // tslint:disable-next-line: deprecation
        || e.which === 13
      ) {
        e.preventDefault();
      }
    });
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.unsubscribe();
  }

}
