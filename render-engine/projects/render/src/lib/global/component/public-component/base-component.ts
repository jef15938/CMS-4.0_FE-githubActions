import { Directive, HostBinding, Injector, OnDestroy } from '@angular/core';
import { Constructor } from '@neux/ui/lib/util/common-behaviors/constructor';
import { Subject } from 'rxjs';

@Directive()
export abstract class CustomizeBaseDirective implements CustomizeBase, OnDestroy {
  @HostBinding('class') class = 'rdr-cp';
  protected destroy$ = new Subject<any>();
  constructor(protected injector: Injector) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export interface CustomizeBase {
  class: string;
}

export type CustomizeBaseCtor = Constructor<CustomizeBase>;

export function mixinCustomizeBase<T extends Constructor<{}>>(base: T): CustomizeBaseCtor & T {
  return class extends base {
    class;
    constructor(...args: any[]) {
      super(...args);
      this.class = 'rdr-cp';
    }
  };
}
