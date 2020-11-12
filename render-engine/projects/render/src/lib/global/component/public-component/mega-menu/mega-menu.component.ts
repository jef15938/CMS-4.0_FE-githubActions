import { Component, OnInit, ViewEncapsulation, Injector, Input, TemplateRef, ViewChild } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';
import { SitemapNode } from '@neux/ui/lib/util/model/mega-menu.model';
import { NxMegaMenuComponent } from '@neux/ui';

@Component({
  selector: 'rdr-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent extends CustomizeBaseDirective implements OnInit {

  @ViewChild(NxMegaMenuComponent) megaMenu: NxMegaMenuComponent;
  @Input() menu: SitemapNode[];
  @Input() customDropdownTemplate: TemplateRef<any>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  toggleMobileMenu() {
    this.megaMenu.toggleMobileMenu();
  }
}
