import { Directive, HostBinding, Injector } from '@angular/core';
import { Constructor } from '@neux/ui/lib/util/common-behaviors/constructor';

@Directive()
export abstract class CustomizeBaseDirective implements CustomizeBase {
  @HostBinding('class') class = 'rdr-cp';
  constructor(protected injector: Injector) { }
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
