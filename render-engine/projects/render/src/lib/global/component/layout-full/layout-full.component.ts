import { Component, OnInit, Injector } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, startWith, tap } from 'rxjs/operators';
import { LayoutInfo } from '../../interface/layout-info.interface';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';

const TEMPLATE_ID = 'layout-full';

@Component({
  selector: 'rdr-layout-full',
  templateUrl: './layout-full.component.html',
  styleUrls: ['./layout-full.component.scss']
})
export class LayoutFullComponent extends CommonTemplateBaseComponent implements OnInit {
  defaultTemplateInfo: LayoutInfo;
  templateInfo: LayoutInfo;
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
