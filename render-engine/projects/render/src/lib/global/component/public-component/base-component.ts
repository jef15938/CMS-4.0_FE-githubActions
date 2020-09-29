import { Directive, HostBinding, Injector } from '@angular/core';

@Directive()
export abstract class CustomizeBaseDirective {
  @HostBinding('class') class = 'rdr-cp';
  constructor(protected injector: Injector) { }
}
