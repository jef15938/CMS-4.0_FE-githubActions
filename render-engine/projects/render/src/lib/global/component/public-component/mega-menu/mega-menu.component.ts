import { Component, OnInit, ViewEncapsulation, Injector, Input } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';
import { SitemapNode } from '@neux/ui/lib/util/model/mega-menu.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'rdr-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent extends CustomizeBaseDirective implements OnInit {

  @Input() menu: SitemapNode[] = [];

  showLogin = false;
  disabled = false;
  private showLogin$: BehaviorSubject<boolean> = new BehaviorSubject(this.showLogin);

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  toggleLogin() {
    if (this.disabled) { return; }
    this.showLogin = !this.showLogin;
    this.showLogin$.next(this.showLogin);
  }

  onShowLoginChange(): Observable<boolean> {
    return this.showLogin$.asObservable();
  }
}
