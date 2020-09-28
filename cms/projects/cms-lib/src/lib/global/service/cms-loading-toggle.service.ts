import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

Injectable();
export class CmsLoadingToggle {

  private isOpen$ = new BehaviorSubject(false);

  isOpen = this.isOpen$.pipe(
    distinctUntilChanged()
  );

  open() {
    this.isOpen$.next(true);
  }

  close() {
    this.isOpen$.next(false);
  }
}
