import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SiteMapGetResponseModel } from '../../../api/data-model/models/site-map-get-response.model';

@Component({
  selector: 'rdr-mega-menu-old',
  templateUrl: './mega-menu-old.component.html',
  styleUrls: ['./mega-menu-old.component.scss']
})
export class MegaMenuOldComponent implements OnInit, OnChanges {

  @Input() menu: SiteMapGetResponseModel;
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
