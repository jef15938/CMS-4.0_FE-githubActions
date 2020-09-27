import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rdr-index-product-search',
  templateUrl: './index-product-search.component.html',
  styleUrls: ['./index-product-search.component.scss']
})
export class IndexProductSearchComponent implements OnInit {

  typeList: Array<string> = ['壽險保障', '健康醫療', '意外傷害', '年金保險', '附加/批注', '團體保險', '投資型保障'];
  constructor() { }

  ngOnInit(): void {
  }

}
