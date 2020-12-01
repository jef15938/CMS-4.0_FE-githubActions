import { Component, OnInit, Injector } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, startWith, tap } from 'rxjs/operators';
import { LayoutTemplateBaseComponent } from '../../../function/wrapper/template-base/layout-template-base.component';

const TEMPLATE_ID = 'layout-full';

@Component({
  selector: 'rdr-layout-full',
  templateUrl: './layout-full.component.html',
  styleUrls: ['./layout-full.component.scss']
})
export class LayoutFullComponent extends LayoutTemplateBaseComponent implements OnInit {
  isShowMenu: boolean;
  isMobile = false;
  windowWidth = window.innerWidth;

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

  ngOnInit(): void {
    fromEvent(window, 'resize').pipe(
      debounceTime(200),
      map(e => (e.target as Window).innerWidth),
      startWith(this.windowWidth),
      tap((width) => this.isMobile = width <= 991)
    ).subscribe(() => { });
  }

  /**
   * 開會小版hamburger menu
   * @memberof LayoutFullComponent
   */
  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }
}
