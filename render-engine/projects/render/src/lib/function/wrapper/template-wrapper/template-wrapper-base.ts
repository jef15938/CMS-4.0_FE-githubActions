import { HostListener, OnDestroy, Output, EventEmitter, ElementRef, ChangeDetectorRef, Injector, Directive, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { WithRenderInfo } from './template-wrapper.interface';
import { RenderPageStore, RenderPageState } from '../../../global/component-store/render-page.store';


@Directive()
export abstract class TemplateWrapperBase implements WithRenderInfo, OnDestroy {
  @Input() fixed;

  protected changeDetectorRef: ChangeDetectorRef = null;
  public elementRef: ElementRef = null;

  @Output() enter = new EventEmitter<HTMLElement>();
  @Output() leave = new EventEmitter<HTMLElement>();

  private renderPageStore: RenderPageStore;
  public renderPageState$: Observable<RenderPageState>;
  public renderPageState: RenderPageState;

  destroy$ = new Subject();

  constructor(
    protected injector: Injector,
  ) {
    this.changeDetectorRef = injector.get(ChangeDetectorRef);
    this.elementRef = injector.get(ElementRef);
    this.renderPageStore = injector.get(RenderPageStore);
    this.renderPageState$ = this.renderPageStore.renderState$.pipe(
      takeUntil(this.destroy$),
      tap(state => this.renderPageState = state),
    );
    this.renderPageState$.subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  @HostListener('click', ['$event']) clickStopPropagation(ev) {
    if (this.renderPageState?.isEditor) {
      ev.stopPropagation();
    }
  }

  @HostListener('mouseenter') mouseenter() {
    if (this.renderPageState?.isEditor) {
      this.enter.next(this.elementRef?.nativeElement);
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.renderPageState?.isEditor) {
      this.leave.next(this.elementRef?.nativeElement);
    }
  }
}
