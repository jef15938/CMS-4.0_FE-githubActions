import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { SiteMapGetResponseModel } from '../../../api/data-model/models/site-map-get-response.model';

@Component({
  selector: 'rdr-mobile-mega-menu',
  templateUrl: './mobile-mega-menu.component.html',
  styleUrls: ['./mobile-mega-menu.component.scss'],
  animations: [
    trigger('toggle', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('false <=> true', animate(300))
    ])
  ]
})
export class MobileMegaMenuComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() menu: SiteMapGetResponseModel;
  @Input() level = 1;
  @Input() maxLavel: number;
  @ViewChild('title') content: ElementRef;
  @ViewChildren('title') contentList: QueryList<ElementRef>;
  classObj = {};
  togglePanel = {};

  constructor() { }
  ngOnChanges() {
    this.classObj = {
      firstLevel: this.level === 1,
      lastLevel: this.level === this.maxLavel
    };
  }
  ngOnInit(): void { }

  ngAfterViewInit() {
    this.contentList.toArray().forEach((elementRef, index) => {
      setTimeout(() => {
        this.togglePanel[index] = false;
      }, 0);
    });
  }

  /**
   * 開合子選單
   * @param {*} event
   * @memberof MobileMegaMenuComponent
   */
  toggleContent(event, index) {
    event.preventDefault();

    event.currentTarget.parentNode.classList.toggle('active');
    this.togglePanel[index] = !this.togglePanel[index];
  }

}
