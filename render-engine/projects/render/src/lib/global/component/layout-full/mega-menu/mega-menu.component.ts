import { Component, OnInit, Input } from '@angular/core';
import { SitemapNode } from '../../../interface';

@Component({
  selector: 'rdr-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit {

  @Input() menu: SitemapNode;
  @Input() level = 1;
  @Input() maxLavel: number;

  currentLevel = 0;
  nextLevel = 0;

  constructor() { }

  ngOnInit(): void {
    this.currentLevel = this.level;
    this.nextLevel = this.currentLevel + 1;
  }

  /**
   * 取得判斷各level class name
   * @returns {Object}
   * @memberof HeaderMenuComponent
   */
  getLevelClass() {
    return {
      firstLevel: this.currentLevel === 1,
      lastLevel: this.currentLevel > this.maxLavel
    };
  }
}
