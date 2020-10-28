import { Input, Directive, Inject, PLATFORM_ID, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class SharingBtnBase implements OnInit, AfterViewInit, OnDestroy {

  @Input() sharedUrl = '';
  @Input() useCurrentUrlAsSharedUrl = true;

  private documentInstance: Document;
  get document() { return this.documentInstance; }

  private destroyInstance$ = new Subject();
  get destroy$() { return this.destroyInstance$.pipe(shareReplay(1)); }

  abstract includeSdk(): Observable<any>;
  abstract loadButton(): any;

  constructor(
    @Inject(DOCUMENT) document: any,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.documentInstance = document;
  }

  private checkSharedUrl() {
    if (!this.useCurrentUrlAsSharedUrl) { return; }
    this.sharedUrl = window.location.href;
  }

  ngOnInit(): void {
    console.warn('SharingBtnBase ngOnInit()');
    if (!isPlatformBrowser(this.platformId)) { return; }
    if (!this.document) { return; }
    this.checkSharedUrl();
  }

  ngAfterViewInit(): void {
    console.warn('SharingBtnBase ngAfterViewInit()');
    if (!isPlatformBrowser(this.platformId)) { return; }
    if (!this.document) { return; }
    this.includeSdk().subscribe(_ => this.loadButton());
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next();
    this.destroyInstance$.unsubscribe();
  }
}
