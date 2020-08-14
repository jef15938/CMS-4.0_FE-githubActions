import { Component, OnInit, Injector } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, startWith, tap } from 'rxjs/operators';
import { CommonTemplateBaseComponent } from '../../../function/wrapper';
import { LayoutInfo } from '../../interface/layout-info.interface';

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

  constructor(injector: Injector) {
    super(injector);
  }

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
