import { Component, OnInit, ViewEncapsulation, Injector, Input } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';
import { SitemapNode } from '@neux/ui/lib/util/model/mega-menu.model';

@Component({
  selector: 'rdr-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent extends CustomizeBaseDirective implements OnInit {

  @Input() menu: SitemapNode[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
