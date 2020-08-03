import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SitemapNode } from '../../../interface';

@Component({
  selector: 'rdr-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit, OnChanges {

  @Input() menu: SitemapNode;
  @Input() level = 1;
  @Input() maxLavel: number;

  classObj = {};

  constructor() { }
  ngOnChanges() {
    this.classObj = {
      firstLevel: this.level === 1,
      lastLevel: this.level === this.maxLavel
    };
  }

  ngOnInit(): void { }
}
