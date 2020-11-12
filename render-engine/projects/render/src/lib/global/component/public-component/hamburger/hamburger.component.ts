import { AfterViewInit, Component, Injector, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NxHamburgerComponent } from '@neux/ui';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CustomizeBaseDirective } from '../base-component';

@Component({
  selector: 'rdr-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HamburgerComponent extends CustomizeBaseDirective implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NxHamburgerComponent) hamburger: NxHamburgerComponent;

  @Input() active = false;

  private statusSubject$: BehaviorSubject<boolean> = new BehaviorSubject(this.active);
  private unsubscribe$: Subject<null> = new Subject();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.hamburger.onStatusChange().pipe(
      tap(result => {
        this.active = result;
        this.statusSubject$.next(this.active);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  /** 開關hambuger 狀態 */
  toggleStatus() {
    this.hamburger.toggleStatus();
  }

  onStatusChange(): Observable<boolean> {
    return this.statusSubject$.asObservable();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
